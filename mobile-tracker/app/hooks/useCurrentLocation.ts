import { useState, useEffect } from "react";
import * as Location from "expo-location";
import sendLocationToServer from "../services/socketService";

interface UseLocationTrackerOptions {
  updateIntervalMs?: number;
  checkStatusIntervalMs?: number;
  vehicleType: string;
  isTracking: boolean; // Added isTracking as parameter
}

export default function useLocationTracker({
  updateIntervalMs = 30000,
  checkStatusIntervalMs = 5000,
  vehicleType,
  isTracking, // Received isTracking to control sending data
}: UseLocationTrackerOptions) {
  const [currentAddress, setCurrentAddress] = useState<string>("");
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>("");
  const [gpsEnabled, setGpsEnabled] = useState<boolean>(true);
  const [loadingLocation, setLoadingLocation] = useState<boolean>(false);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      setLoadingLocation(true);
      try {
        const servicesEnabled = await Location.hasServicesEnabledAsync();
        if (!servicesEnabled) {
          setGpsEnabled(false);
          return;
        }

        const { status } = await Location.getForegroundPermissionsAsync();
        if (status !== "granted") {
          setGpsEnabled(false);
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

        const reverseGeocode = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (reverseGeocode.length > 0) {
          const address = reverseGeocode[0];
          setCurrentAddress(
            `${address.street}, ${address.streetNumber} - ${address.district}`
          );
        } else {
          setCurrentAddress("Endereço não encontrado.");
        }

        // Send location data only if tracking is active
        if (isTracking && gpsEnabled) {
          sendLocationToServer(
            latitude,
            longitude,
            currentAddress || "Endereço não disponível",
            vehicleType, // Pass the vehicleType
            lastUpdatedTime
          );
        }
      } catch (error) {
        console.log("Erro ao obter localização:", error);
      } finally {
        setLoadingLocation(false);
      }
    }, checkStatusIntervalMs);

    return () => clearInterval(intervalId);
  }, [
    checkStatusIntervalMs,
    currentAddress,
    gpsEnabled,
    lastUpdatedTime,
    vehicleType,
    isTracking, // Ensure it checks tracking status
  ]);

  return {
    currentAddress,
    latitude,
    longitude,
    lastUpdatedTime,
    gpsEnabled,
    loadingLocation,
  };
}
