import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import type { LocationObject } from "expo-location"

interface LocationDisplayProps {
  location: LocationObject | null
  currentAddress: string | null
  lastUpdateTime: Date | null
}

export const LocationDisplay: React.FC<LocationDisplayProps> = ({ location, currentAddress, lastUpdateTime }) => {
  const formatCoordinate = (value: number | undefined) => {
    if (value === undefined) return "N/A"
    return value.toFixed(6)
  }

  const formatTime = (date: Date | null) => {
    if (!date) return "Nunca"

    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    const seconds = date.getSeconds().toString().padStart(2, "0")

    return `${hours}:${minutes}:${seconds}`
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Localização Atual</Text>

      <View style={styles.coordinateContainer}>
        <Text style={styles.label}>Latitude:</Text>
        <Text style={styles.value}>{formatCoordinate(location?.coords.latitude)}</Text>
      </View>

      <View style={styles.coordinateContainer}>
        <Text style={styles.label}>Longitude:</Text>
        <Text style={styles.value}>{formatCoordinate(location?.coords.longitude)}</Text>
      </View>

      <View style={styles.addressContainer}>
        <Text style={styles.addressLabel}>Endereço:</Text>
        <Text style={styles.addressValue}>{currentAddress || "Endereço não disponível"}</Text>
      </View>

      <View style={styles.timeContainer}>
        <Text style={styles.timeLabel}>Última atualização:</Text>
        <Text style={styles.timeValue}>{formatTime(lastUpdateTime)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#2c3e50",
  },
  coordinateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 18,
    color: "#7f8c8d",
    fontWeight: "500",
  },
  value: {
    fontSize: 18,
    color: "#2c3e50",
    fontWeight: "bold",
  },
  addressContainer: {
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  addressLabel: {
    fontSize: 18,
    color: "#7f8c8d",
    fontWeight: "500",
    marginBottom: 4,
  },
  addressValue: {
    fontSize: 16,
    color: "#2c3e50",
    lineHeight: 22,
  },
  timeContainer: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#ecf0f1",
    paddingTop: 12,
  },
  timeLabel: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
  },
})
