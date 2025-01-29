import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Play, Pause, Clock } from "lucide-react-native";
import { styles } from "./styles/styles";
import useLocationTracker from "./hooks/useCurrentLocation";
import LocationTrackerCard from "./components/locationInfoCard";
import { formatTime } from "./utils/TimeInput";

const WorkTrackingApp: React.FC = () => {
  const [vehicleType, setVehicleType] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const { currentAddress, loadingLocation, gpsEnabled, lastUpdatedTime } =
    useLocationTracker({
      updateIntervalMs: 10000,
      trackingDurationMs: 200000,
    });

  // Button should only show if:
  // - "Tempo Real": vehicleType is filled.
  const canStartStop = vehicleType.trim() !== "";

  // - "Agendar": vehicleType, startTime, and endTime are all filled.
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
    // In this demo, we just toggle isTracking on submit
    setIsTracking(!isTracking);
  };

  return (
    <View style={styles.container}>
      {/* Display location info card */}
      <LocationTrackerCard
        currentAddress={currentAddress}
        loadingLocation={loadingLocation}
        gpsEnabled={gpsEnabled}
        lastUpdatedTime={lastUpdatedTime}
      />

      {/* Main card for user input */}
      <View style={styles.card}>
        <Text style={styles.title}>Iniciar as Viagens</Text>

        {/* Vehicle type */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Digite o tipo do veículo</Text>
          <TextInput
            value={vehicleType}
            onChangeText={setVehicleType}
            style={styles.input}
            placeholder="Ex.: Ônibus, Van, Micro-ônibus"
          />
        </View>

        {/* Toggle between Tempo Real and Agendar */}
        <View style={styles.toggleGroup}>
          <TouchableOpacity
            onPress={() => setShowSchedule(false)}
            style={[
              styles.toggleButton,
              !showSchedule ? styles.activeButton : styles.inactiveButton,
              { marginRight: 8 },
            ]}
          >
            <Text
              style={!showSchedule ? styles.activeText : styles.inactiveText}
            >
              Tempo Real
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowSchedule(true)}
            style={[
              styles.toggleButton,
              showSchedule ? styles.activeButton : styles.inactiveButton,
            ]}
          >
            <Text
              style={showSchedule ? styles.activeText : styles.inactiveText}
            >
              Agendar
            </Text>
          </TouchableOpacity>
        </View>

        {/* If "Agendar" mode is selected */}
        {showSchedule ? (
          <View>
            {/* Start time */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Horário de Início</Text>
              <TextInput
                value={startTime}
                onChangeText={handleStartTimeChange}
                style={styles.input}
                placeholder="HH:MM"
                keyboardType="numeric"
                maxLength={5}
              />
            </View>

            {/* End time */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Horário de Término</Text>
              <TextInput
                value={endTime}
                onChangeText={handleEndTimeChange}
                style={styles.input}
                placeholder="HH:MM"
                keyboardType="numeric"
                maxLength={5}
              />
            </View>

            {/* Show button ONLY if all fields are filled */}
            {canSchedule && (
              <TouchableOpacity
                onPress={handleSubmit}
                style={[styles.submitButton, styles.scheduleButton]}
              >
                <Clock size={20} color="white" />
                <Text style={styles.buttonText}> Confirmar Horário</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          // "Tempo Real" mode. Show button ONLY if vehicleType is filled
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
                  <Text style={styles.buttonText}> Parar</Text>
                </>
              ) : (
                <>
                  <Play size={20} color="white" />
                  <Text style={styles.buttonText}> Iniciar</Text>
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
