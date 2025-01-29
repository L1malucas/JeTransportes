import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Play, Pause, Clock } from "lucide-react-native";
import { styles } from "./styles/styles";
import useLocationTracker from "./hooks/useCurrentLocation";
import LocationTrackerCard from "./components/locationInfoCard";

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

  const handleSubmit = () => {
    setIsTracking(!isTracking);
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
                onChangeText={setStartTime}
                style={styles.input}
                placeholder="HH:MM"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Horário de Término</Text>
              <TextInput
                value={endTime}
                onChangeText={setEndTime}
                style={styles.input}
                placeholder="HH:MM"
                keyboardType="numeric"
              />
            </View>
          </View>
        ) : (
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
        )}

        {showSchedule && (
          <TouchableOpacity
            onPress={handleSubmit}
            style={[styles.submitButton, styles.scheduleButton]}
          >
            <Clock size={20} color="white" />
            <Text style={styles.buttonText}> Confirmar Horário</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default WorkTrackingApp;
