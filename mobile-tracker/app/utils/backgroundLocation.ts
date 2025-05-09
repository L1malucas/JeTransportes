import * as Location from "expo-location"
import * as TaskManager from "expo-task-manager"

const BACKGROUND_TASK_NAME = "BACKGROUND_LOCATION_TASK"

TaskManager.defineTask(BACKGROUND_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error("Background task error:", error.message)
    return
  }
  if (data) {
    const { locations } = data as { locations: Location.LocationObject[] }
    if (locations && locations.length > 0) {
      console.log("Background location update:", locations[0])
      // Implement persistent storage or queue for socket transmission
    }
  }
})

export const startBackgroundLocation = async (vehicleType: string) => {
  try {
    if (!await TaskManager.isTaskDefined(BACKGROUND_TASK_NAME)) {
      throw new Error("Background task not defined")
    }

    const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync()
    if (foregroundStatus !== "granted") {
      throw new Error("Foreground location permission not granted")
    }

    const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync()
    if (backgroundStatus !== "granted") {
      throw new Error("Background location permission not granted")
    }

    await Location.startLocationUpdatesAsync(BACKGROUND_TASK_NAME, {
      accuracy: Location.Accuracy.High,
      distanceInterval: 10,
      timeInterval: 5000,
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: "JE Transportes",
        notificationBody: `Rastreando veículo: ${vehicleType}`,
        notificationColor: "#27ae60",
      },
    })

    console.log("Background location updates started!")
  } catch (error) {
    console.error("Failed to start background location:", error)
    throw error
  }
}

export const stopBackgroundLocation = async () => {
  try {
    if (await TaskManager.isTaskRegisteredAsync(BACKGROUND_TASK_NAME)) {
      await Location.stopLocationUpdatesAsync(BACKGROUND_TASK_NAME)
      console.log("Background location updates stopped!")
    }
  } catch (error) {
    console.error("Failed to stop background location:", error)
    throw error
  }
}