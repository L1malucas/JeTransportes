"use client"

import { useState, useEffect, useCallback } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Alert, BackHandler } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Picker } from "@react-native-picker/picker"
import { useLocation } from "../hooks/useLocation"
import { useSocket } from "../hooks/useSocket"
import { useNetwork } from "../hooks/useNetwork"
import { useNotification } from "../hooks/useNotification"
import { StatusIndicator } from "../components/StatusIndicator"
import { LocationDisplay } from "../components/LocationDisplay"
import { ErrorBanner } from "../components/ErrorBanner"
import { startBackgroundLocation, stopBackgroundLocation } from "../utils/backgroundLocation"
import { Feather } from "@expo/vector-icons"

const vehicleOptions = [
  { label: "Selecione um veículo", value: "" },
  { label: "Ônibus", value: "Ônibus" },
  { label: "Carro 1", value: "Carro 1" },
  { label: "Carro 2", value: "Carro 2" },
  { label: "Van", value: "Van" },
]

export default function MainScreen() {
  const [selectedVehicle, setSelectedVehicle] = useState("")
  const [isTracking, setIsTracking] = useState(false)
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null)

  const {
    location,
    currentAddress,
    hasLocationPermission,
    isGpsEnabled,
    requestLocationPermission,
    getCurrentLocation
  } = useLocation()
  const { isConnected: isSocketConnected, connect, disconnect, sendLocationUpdate } = useSocket()
  const { isNetworkAvailable } = useNetwork()
  const { showNotification, removeNotification } = useNotification()

  const startTracking = useCallback(async () => {
    if (!selectedVehicle) {
      Alert.alert("Erro", "Selecione um veículo primeiro")
      return
    }

    if (!hasLocationPermission) {
      Alert.alert(
        "Permissão Necessária",
        "Este aplicativo precisa de acesso à sua localização para funcionar, mesmo em segundo plano. Por favor, conceda as permissões solicitadas.",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Conceder", onPress: async () => {
              const granted = await requestLocationPermission()
              if (!granted) {
                Alert.alert("Permissão Negada", "É necessário permitir o acesso à localização para usar este recurso.")
              }
            }
          }
        ]
      )
      return
    }

    if (!isGpsEnabled) {
      Alert.alert("GPS Desligado", "Por favor, ative o GPS para usar este recurso.")
      return
    }

    if (!isNetworkAvailable) {
      Alert.alert("Sem Conexão", "Verifique sua conexão com a internet e tente novamente.")
      return
    }

    try {
      await connect(selectedVehicle)
      await startBackgroundLocation(selectedVehicle)
      setIsTracking(true)
      showNotification("Enviando Localização", `Veículo: ${selectedVehicle}`)
    } catch (error) {
      console.error("Failed to start tracking:", error)
      Alert.alert("Erro", "Não foi possível iniciar o rastreamento. Verifique as permissões e tente novamente.")
    }
  }, [
    selectedVehicle,
    hasLocationPermission,
    isGpsEnabled,
    isNetworkAvailable,
    connect,
    requestLocationPermission,
    showNotification,
  ])

  const stopTracking = useCallback(async () => {
    try {
      await disconnect()
      await stopBackgroundLocation()
      setIsTracking(false)
      removeNotification()
    } catch (error) {
      console.error("Failed to stop tracking:", error)
      Alert.alert("Erro", "Não foi possível parar o rastreamento.")
    }
  }, [disconnect, removeNotification])

  const shutdownApp = useCallback(() => {
    stopTracking()
    if (Platform.OS === "ios") {
      Alert.alert("Aplicativo Encerrado", "O aplicativo foi encerrado com sucesso.")
    } else {
      BackHandler.exitApp()
    }
  }, [stopTracking])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isTracking && location && isSocketConnected) {
      const sendUpdate = () => {
        const now = new Date()
        const formattedTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`

        sendLocationUpdate(
          location.coords.latitude,
          location.coords.longitude,
          currentAddress || "Endereço não disponível",
          selectedVehicle,
          formattedTime,
        )
        setLastUpdateTime(now)
      }

      sendUpdate()
      interval = setInterval(sendUpdate, 10000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTracking, location, isSocketConnected, currentAddress, selectedVehicle, sendLocationUpdate])

  const hasGpsError = !isGpsEnabled
  const hasNetworkError = !isNetworkAvailable
  const hasSocketError = isTracking && !isSocketConnected

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <StatusIndicator isActive={isTracking} />
        <TouchableOpacity
          style={styles.shutdownButton}
          onPress={shutdownApp}
          accessibilityLabel="Desligar aplicativo"
          accessibilityHint="Encerra completamente o aplicativo"
        >
          <Feather name="power" size={24} color="white" />
          <Text style={styles.shutdownButtonText}>Desligar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {hasGpsError && <ErrorBanner message="GPS desligado. Por favor, ative o GPS." />}
        {hasNetworkError && <ErrorBanner message="Falha de rede. Verifique sua conexão." />}
        {hasSocketError && <ErrorBanner message="Falha de comunicação. Tentando reconectar..." />}

        <LocationDisplay location={location} currentAddress={currentAddress} lastUpdateTime={lastUpdateTime} />

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Selecione o veículo:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedVehicle}
              onValueChange={(itemValue) => setSelectedVehicle(itemValue)}
              style={styles.picker}
              accessibilityLabel="Selecione o veículo"
            >
              {vehicleOptions.map((option) => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))}
            </Picker>
          </View>
        </View>

        {isTracking ? (
          <TouchableOpacity
            style={styles.stopButton}
            onPress={stopTracking}
            accessibilityLabel="Parar rastreamento"
            accessibilityHint="Para de enviar sua localização"
          >
            <Text style={styles.buttonText}>Parar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.startButton, !selectedVehicle && styles.disabledButton]}
            onPress={startTracking}
            disabled={!selectedVehicle}
            accessibilityLabel="Iniciar rastreamento"
            accessibilityHint="Começa a enviar sua localização"
          >
            <Text style={styles.buttonText}>Iniciar</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2c3e50",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  shutdownButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e74c3c",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  shutdownButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 16,
  },
  scrollContent: {
    padding: 20,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#2c3e50",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "white",
    marginBottom: 16,
  },
  picker: {
    height: 60,
    width: "100%",
  },
  startButton: {
    backgroundColor: "#27ae60",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  stopButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  disabledButton: {
    backgroundColor: "#95a5a6",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
})