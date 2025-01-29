import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  address: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 16,
    justifyContent: "center", // Add this
    alignItems: "center", // Add this
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: "100%", // Add this
    maxWidth: 400, // Add this to limit the card width
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#333",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  toggleGroup: {
    flexDirection: "row",
    marginBottom: 16,
  },
  toggleButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#2563eb",
  },
  inactiveButton: {
    backgroundColor: "#e5e7eb",
  },
  activeText: {
    color: "#fff",
  },
  inactiveText: {
    color: "#6b7280",
  },
  submitButton: {
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  startButton: {
    backgroundColor: "#10b981",
  },
  stopButton: {
    backgroundColor: "#ef4444",
  },
  scheduleButton: {
    backgroundColor: "#2563eb",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
});
