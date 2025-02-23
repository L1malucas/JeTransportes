import * as Location from "expo-location";
import { LocationObject } from "expo-location";

// Check if GPS is enabled and permissions are granted
export default async function checkLocationStatus(): Promise<{
  gpsEnabled: boolean;
  error: string | null;
}> {
  try {
    const servicesEnabled = await Location.hasServicesEnabledAsync();
    if (!servicesEnabled) {
      return { gpsEnabled: false, error: "GPS is off" };
    }

    const { status } = await Location.getForegroundPermissionsAsync();
    if (status !== "granted") {
      return { gpsEnabled: false, error: "GPS permission not granted" };
    }

    return { gpsEnabled: true, error: null };
  } catch (error) {
    console.log("Error checking location status:", error);
    return { gpsEnabled: false, error: "Error checking location status" };
  }
}

// Watch the user's location and return it
export const startLocationWatch = async (
  updateIntervalMs: number,
  callback: (location: LocationObject) => void
): Promise<Location.LocationSubscription | null> => {
  try {
    const watchSubscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        timeInterval: updateIntervalMs,
        distanceInterval: 0,
      },
      callback
    );
    return watchSubscription;
  } catch (error) {
    console.log("Error starting location watch:", error);
    return null;
  }
};

// Stop the location watch
export const stopLocationWatch = (
  watchSubscription: Location.LocationSubscription | null
): void => {
  if (watchSubscription) {
    watchSubscription.remove();
  }
};

// Reverse geocode the location and return the formatted address
export const reverseGeocodeLocation = async (
  latitude: number,
  longitude: number
): Promise<string> => {
  try {
    const reverseGeocode = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    if (reverseGeocode.length > 0) {
      const address = reverseGeocode[0];
      return `${address.street}, ${address.streetNumber} - ${address.district}`;
    }
    return "Endereço não encontrado";
  } catch (error) {
    console.log("Error in reverse geocoding:", error);
    return "Endereço não disponível";
  }
};
