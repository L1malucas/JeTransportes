import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Play, Pause, Clock } from "lucide-react-native";
import { styles } from "./styles/styles";
import useLocationTracker from "./hooks/useCurrentLocation";
import LocationTrackerCard from "./components/LocationTrackerCard";
import { formatTime } from "./utils/timeInput";
import { sendLocationToServer } from "./services/sendLocation";

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
    updateIntervalMs: 50000,
    trackingDurationMs: 200000,
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
    setIsTracking(!isTracking);
    if (vehicleType && latitude && longitude) {
      // Se vehicleType estiver vazio, passar um valor default "Desconhecido"
      sendLocationToServer(
        latitude,
        longitude,
        currentAddress,
        vehicleType || "Desconhecido", // Garantindo que nunca envie um campo vazio ou nulo
        lastUpdatedTime || new Date().toLocaleTimeString() // Garantir que o lastUpdatedTime não seja nulo
      );
    }
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
        <Text style={styles.title}>Iniciar as Viagens</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Digite o tipo do veículo</Text>
          <TextInput
            value={vehicleType}
            onChangeText={setVehicleType}
            style={styles.input}
            placeholder="Ex.: Ônibus, Van, Micro-ônibus"
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

        {showSchedule ? (
          <View>
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
