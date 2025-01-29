import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { Play, Pause, Clock } from "lucide-react-native";
import { styles } from "./styles/styles";

const WorkTrackingApp: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [showSchedule, setShowSchedule] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [loadingLocation, setLoadingLocation] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        console.log("Iniciando solicitação de permissão de localização...");
        const { status } = await Location.requestForegroundPermissionsAsync();
        console.log("Status da permissão:", status);

        if (status !== "granted") {
          console.log("Permissão negada pelo usuário");
          setCurrentAddress("Permissão para acessar localização foi negada.");
          setLoadingLocation(false);
          return;
        }

        console.log("Obtendo posição atual...");
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        console.log("Coordenadas obtidas:", { latitude, longitude });

        console.log("Convertendo coordenadas em endereço...");
        const reverseGeocode = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (reverseGeocode.length > 0) {
          const address = reverseGeocode[0];
          console.log("Endereço encontrado:", address);
          setCurrentAddress(
            `${address.street}, ${address.streetNumber} - ${address.district}`
          );
        } else {
          console.log("Nenhum endereço encontrado para as coordenadas");
          setCurrentAddress("Endereço não encontrado.");
        }
      } catch (error) {
        console.error("Erro durante o processo de localização:", error);
        setCurrentAddress("Falha ao obter localização.");
      } finally {
        console.log("Processo de localização finalizado");
        setLoadingLocation(false);
      }
    })();
  }, []);

  const handleSubmit = () => {
    setIsTracking(!isTracking);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu local atual</Text>
      {loadingLocation ? (
        <ActivityIndicator size="large" color="#2563eb" />
      ) : (
        <Text style={styles.address}>{currentAddress}</Text>
      )}

      <View style={styles.card}>
        <Text style={styles.title}>Iniciar as Viagens</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Digite o tipo do veículo</Text>
          <TextInput
            value={name}
            onChangeText={setName}
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
