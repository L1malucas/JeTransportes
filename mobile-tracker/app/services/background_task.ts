import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import sendLocationToServer from "../services/socketService";

const BACKGROUND_LOCATION_TASK = "background-location-task";

// Define the background task
TaskManager.defineTask(BACKGROUND_LOCATION_TASK, async ({ data, error }: { data: { locations: Location.LocationObject[] }, error: any }) => {
  if (error) {
    console.error("Background task error:", error);
    return;
  }
  if (data) {
    const { locations } = data;
      const { latitude, longitude } = locations[0].coords;
    const timestamp = new Date().toLocaleTimeString();

    try {
      // Reverse geocode to get address
      const reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
      const address = reverseGeocode[0];
      const formattedAddress = address
        ? `${address.street || ""}, ${address.streetNumber || ""} - ${address.district || ""}`
        : "Endereço não encontrado.";

      // Send data to server
      sendLocationToServer(
        latitude,
        longitude,
        formattedAddress,
        "vehicleType_placeholder", // Replace with actual vehicleType (see below)
        timestamp
      );
    } catch (err) {
      console.error("Error in background task:", err);
    }
  }
});