import { useState, useEffect } from "react";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import sendLocationToServer from "../services/socketService";

interface UseLocationTrackerOptions {
  updateIntervalMs?: number;
  checkStatusIntervalMs?: number;
  vehicleType: string;
  isTracking: boolean;
}

const BACKGROUND_LOCATION_TASK = "background-location-task";

export default function useLocationTracker({
  updateIntervalMs = 30000,
  checkStatusIntervalMs = 5000,
  vehicleType,
  isTracking,
}: UseLocationTrackerOptions) {
  const [currentAddress, setCurrentAddress] = useState<string>("");
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>("");
  const [gpsEnabled, setGpsEnabled] = useState<boolean>(true);
  const [loadingLocation, setLoadingLocation] = useState<boolean>(false);
  const [permissionRequested, setPermissionRequested] = useState<boolean>(false);

  // Persist vehicleType for background task
  useEffect(() => {
    const saveVehicleType = async () => {
      try {
        await AsyncStorage.setItem("vehicleType", vehicleType);
      } catch (err) {
        console.error("Error saving vehicleType:", err);
      }
    };
    if (vehicleType) {
      saveVehicleType();
    }
  }, [vehicleType]);

  // Request permissions (foreground and background)
  useEffect(() => {
    let isMounted = true;

    const requestPermissions = async () => {
      try {
        // Request foreground permissions
        let { status: fgStatus } = await Location.requestForegroundPermissionsAsync();
        if (fgStatus !== "granted") {
          if (isMounted) {
            setGpsEnabled(false);
            setPermissionRequested(true);
          }
          return;
        }

        // Request background permissions
        let { status: bgStatus } = await Location.requestBackgroundPermissionsAsync();
        if (isMounted) {
          setGpsEnabled(bgStatus === "granted");
          setPermissionRequested(true);
        }
      } catch (error) {
        console.error("Error requesting location permissions:", error);
        if (isMounted) {
          setGpsEnabled(false);
          setPermissionRequested(true);
        }
      }
    };

    if (!permissionRequested) {
      requestPermissions();
    }

    return () => {
      isMounted = false;
    };
  }, [permissionRequested]);

  // Start/stop background location tracking
  useEffect(() => {
    if (!permissionRequested || !gpsEnabled || !isTracking) return;

    const startBackgroundTracking = async () => {
      try {
        const isTaskRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_LOCATION_TASK);
        if (!isTaskRegistered) {
          await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
            accuracy: Location.Accuracy.High,
            timeInterval: updateIntervalMs, // Update interval in ms
            distanceInterval: 10, // Minimum distance (meters) before update
            showsBackgroundLocationIndicator: true, // iOS: Show blue bar
            foregroundService: {
              notificationTitle: "Location Tracking",
              notificationBody: "Your location is being tracked in the background.",
            },
          });
        }
      } catch (err) {
        console.error("Error starting background tracking:", err);
      }
    };

    const stopBackgroundTracking = async () => {
      try {
        if (await TaskManager.isTaskRegisteredAsync(BACKGROUND_LOCATION_TASK)) {
          await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK);
        }
      } catch (err) {
        console.error("Error stopping background tracking:", err);
      }
    };

    if (isTracking) {
      startBackgroundTracking();
    } else {
      stopBackgroundTracking();
    }

    return () => {
      stopBackgroundTracking();
    };
  }, [isTracking, gpsEnabled, permissionRequested, updateIntervalMs]);

  // Foreground location updates (for UI)
  useEffect(() => {
    if (!permissionRequested || !gpsEnabled) return;

    const intervalId = setInterval(async () => {
      setLoadingLocation(true);
      try {
        const servicesEnabled = await Location.hasServicesEnabledAsync();
        if (!servicesEnabled) {
          setGpsEnabled(false);
          setLoadingLocation(false);
          return;
        }

        const { status } = await Location.getForegroundPermissionsAsync();
        if (status !== "granted") {
          setGpsEnabled(false);
          setLoadingLocation(false);
          return;
        }

        setGpsEnabled(true);
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        const { latitude, longitude } = location.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        setLastUpdatedTime(new Date().toLocaleTimeString());

        const reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
        const address = reverseGeocode[0];
        setCurrentAddress(
          address
            ? `${address.street || ""}, ${address.streetNumber || ""} - ${address.district || ""}`
            : "Endereço não encontrado."
        );

        // Send to server if tracking (foreground)
        if (isTracking) {
          sendLocationToServer(
            latitude,
            longitude,
            currentAddress || "Endereço não disponível",
            vehicleType,
            lastUpdatedTime
          );
        }
      } catch (error) {
        console.error("Error obtaining location:", error);
      } finally {
        setLoadingLocation(false);
      }
    }, checkStatusIntervalMs);

    return () => clearInterval(intervalId);
  }, [checkStatusIntervalMs, vehicleType, isTracking, gpsEnabled, permissionRequested]);

  return {
    currentAddress,
    latitude,
    longitude,
    lastUpdatedTime,
    gpsEnabled,
    loadingLocation,
  };
}