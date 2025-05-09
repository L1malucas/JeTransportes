import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Feather } from "@expo/vector-icons"

interface ErrorBannerProps {
  message: string
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Feather name="alert-triangle" size={20} color="#fff" />
      <Text style={styles.message}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e74c3c",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  message: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 12,
    flex: 1,
  },
})
