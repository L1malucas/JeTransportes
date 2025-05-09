import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Play, Pause, Clock } from "lucide-react-native";
import { styles } from "./styles/styles";
import useLocationTracker from "./hooks/useCurrentLocation";
import LocationTrackerCard from "./components/LocationTrackerCard";
import formatTime from "./utils/timeInput";

const WorkTrackingApp: React.FC = () => {
  const [vehicleType, setVehicleType] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const {
    currentAddress,
    loadingLocation,
    gpsEnabled,
    lastUpdatedTime,
    latitude,
    longitude,
  } = useLocationTracker({
    updateIntervalMs: 30000,
    checkStatusIntervalMs: 5000,
    vehicleType,
    isTracking,
  });

  const canStartStop = vehicleType.trim() !== "";
  const canSchedule =
    vehicleType.trim() !== "" &&
    startTime.trim() !== "" &&
    endTime.trim() !== "";

  const handleStartTimeChange = (text: string) => {
    const formatted = formatTime(text);
    setStartTime(formatted);
  };

  const handleEndTimeChange = (text: string) => {
    const formatted = formatTime(text);
    setEndTime(formatted);
  };

  const handleSubmit = () => {
    if (!gpsEnabled) {
      alert("GPS disabled. Cannot start tracking.");
      return;
    }
    setIsTracking((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <LocationTrackerCard
        currentAddress={currentAddress}
        loadingLocation={loadingLocation}
        gpsEnabled={gpsEnabled}
        lastUpdatedTime={lastUpdatedTime}
      />

      <View style={styles.card}>
        <Text style={styles.title}>Start Trips</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Enter vehicle type</Text>
          <TextInput
            value={vehicleType}
            onChangeText={setVehicleType}
            style={styles.input}
            placeholder="E.g., Bus, Van, Minibus"
          />
        </View>

        <View style={styles.toggleGroup}>
          <TouchableOpacity
            onPress={() => setShowSchedule(false)}
            style={[
              styles.toggleButton,
              !showSchedule ? styles.activeButton : styles.inactiveButton,
              { marginRight: 8 },
            ]}
          >
            <Text style={!showSchedule ? styles.activeText : styles.inactiveText}>
              Real-Time
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowSchedule(true)}
            style={[
              styles.toggleButton,
              showSchedule ? styles.activeButton : styles.inactiveButton,
            ]}
          >
            <Text style={showSchedule ? styles.activeText : styles.inactiveText}>
              Schedule
            </Text>
          </TouchableOpacity>
        </View>

        {showSchedule ? (
          <View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Start Time</Text>
              <TextInput
                value={startTime}
                onChangeText={handleStartTimeChange}
                style={styles.input}
                placeholder="HH:MM"
                keyboardType="numeric"
                maxLength={5}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>End Time</Text>
              <TextInput
                value={endTime}
                onChangeText={handleEndTimeChange}
                style={styles.input}
                placeholder="HH:MM"
                keyboardType="numeric"
                maxLength={5}
              />
            </View>

            {canSchedule && (
              <TouchableOpacity
                onPress={handleSubmit}
                style={[styles.submitButton, styles.scheduleButton]}
              >
                <Clock size={20} color="white" />
                <Text style={styles.buttonText}> Confirm Schedule</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          canStartStop && (
            <TouchableOpacity
              onPress={handleSubmit}
              style={[
                styles.submitButton,
                isTracking ? styles.stopButton : styles.startButton,
              ]}
            >
              {isTracking ? (
                <>
                  <Pause size={20} color="white" />
                  <Text style={styles.buttonText}> Stop</Text>
                </>
              ) : (
                <>
                  <Play size={20} color="white" />
                  <Text style={styles.buttonText}> Start</Text>
                </>
              )}
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
};

export default WorkTrackingApp;