import { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import { sendLocationToServer } from "../services/sendLocation";

interface UseLocationTrackerOptions {
  updateIntervalMs?: number;
  trackingDurationMs?: number;
  checkStatusIntervalMs?: number;
}

export default function useLocationTracker({
  updateIntervalMs = 30000,
  trackingDurationMs = 0,
  checkStatusIntervalMs = 5000,
}: UseLocationTrackerOptions) {
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [loadingLocation, setLoadingLocation] = useState<boolean>(true);
  const [gpsEnabled, setGpsEnabled] = useState<boolean>(true);
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const watchSubscription = useRef<Location.LocationSubscription | null>(null);
  const trackingTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let isMounted = true;

    const checkLocationStatus = async () => {
      if (!isMounted) return;

      setLastUpdatedTime(new Date().toLocaleTimeString());

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
      } catch (error) {
        setGpsEnabled(false);
        setLoadingLocation(false);
      }
    };

    checkLocationStatus();
    const intervalId = setInterval(checkLocationStatus, checkStatusIntervalMs);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [checkStatusIntervalMs]);

  useEffect(() => {
    let isMounted = true;

    const startWatchingLocation = async () => {
      try {
        if (watchSubscription.current) {
          watchSubscription.current.remove();
          watchSubscription.current = null;
        }

        setLoadingLocation(true);
        watchSubscription.current = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Highest,
            timeInterval: updateIntervalMs,
            distanceInterval: 0,
          },
          async (location) => {
            if (!isMounted) return;

            try {
              const { latitude, longitude } = location.coords;
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

              setLatitude(latitude);
              setLongitude(longitude);
              setLastUpdatedTime(new Date().toLocaleTimeString());

              // Enviar sempre, mesmo que os dados não tenham mudado
              sendLocationToServer(
                latitude,
                longitude,
                currentAddress || "Endereço não disponível",
                "", // Se o tipo de veículo não estiver preenchido, enviar uma string vazia
                lastUpdatedTime
              );
            } catch (error) {
              console.log("Error in location watcher:", error);
            } finally {
              setLoadingLocation(false);
            }
          }
        );

        if (trackingDurationMs > 0) {
          trackingTimeout.current = setTimeout(() => {
            if (watchSubscription.current) {
              watchSubscription.current.remove();
              watchSubscription.current = null;
            }
          }, trackingDurationMs);
        }
      } catch (error) {
        console.log("Error starting location watch:", error);
        setLoadingLocation(false);
      }
    };

    if (gpsEnabled) {
      startWatchingLocation();
    } else {
      if (watchSubscription.current) {
        watchSubscription.current.remove();
        watchSubscription.current = null;
      }
      if (trackingTimeout.current) {
        clearTimeout(trackingTimeout.current);
        trackingTimeout.current = null;
      }
      setLoadingLocation(false);
    }

    return () => {
      isMounted = false;
      if (watchSubscription.current) {
        watchSubscription.current.remove();
        watchSubscription.current = null;
      }
      if (trackingTimeout.current) {
        clearTimeout(trackingTimeout.current);
        trackingTimeout.current = null;
      }
    };
  }, [gpsEnabled, updateIntervalMs, trackingDurationMs]);

  return {
    currentAddress,
    loadingLocation,
    gpsEnabled,
    lastUpdatedTime,
    latitude,
    longitude,
  };
}
