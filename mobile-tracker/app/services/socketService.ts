import { io } from "socket.io-client";

// Generate a unique client ID (you can use a more sophisticated method if needed)
const generateClientId = () => {
  // Example: create a unique client ID based on timestamp and a random number
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
};

// Connect to the server
const socket = io("https://jetransportes.onrender.com/", {
  transports: ["websocket", "polling"],
  withCredentials: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Get the unique client ID
const clientId = generateClientId();

// Function to send location data to the server
const sendLocationToServer = (
  latitude: number,
  longitude: number,
  currentAddress: string,
  vehicleType: string,
  lastUpdatedTime: string
) => {
  const locationData = {
    clientId, // Attach the unique client ID to the data
    latitude,
    longitude,
    currentAddress: currentAddress || "Endereço não disponível", // Fallback to the last known address
    vehicleType,
    lastUpdatedTime,
  };

  // Emit location data to the server
  socket.emit("location", locationData);
  console.log("Location data emitted:", locationData);
};

// Example of how you could use it in the tracking component
export default sendLocationToServer;
