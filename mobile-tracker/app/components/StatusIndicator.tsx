import type React from "react"
import { View, Text, StyleSheet } from "react-native"

interface StatusIndicatorProps {
  isActive: boolean
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ isActive }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.indicator, isActive ? styles.activeIndicator : styles.inactiveIndicator]} />
      <Text style={styles.statusText}>{isActive ? "ON" : "OFF"}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  activeIndicator: {
    backgroundColor: "#2ecc71",
  },
  inactiveIndicator: {
    backgroundColor: "#e74c3c",
  },
  statusText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
})
