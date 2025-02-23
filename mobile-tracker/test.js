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

// Replace your emitTestLocationData function with this:
const emitTestLocationData = () => {
  const locationData = generateRandomLocationData();
  locationData.clientId = clientId; // Attach the unique client ID to the data
  socket.emit("location", locationData);
  console.log("Location data emitted:", locationData);
};

// Emit location data every 3 seconds to simulate continuous updates
setInterval(emitTestLocationData, 3000);

// Handle locationUpdate event to get feedback from the server
socket.on("locationUpdate", (data) => {
  console.log("Location update received from server:", data);
});

function generateRandomLocationData() {
  // Base coordinates (São Paulo region)
  const baseLat = -23;
  const baseLng = -46;

  // Random offset within ~5km
  const randomLat = baseLat + (Math.random() - 0.5) * 0.1;
  const randomLng = baseLng + (Math.random() - 0.5) * 0.1;

  return {
    latitude: randomLat,
    longitude: randomLng,
    currentAddress: `Random Address ${Math.floor(Math.random() * 1000)}, Test St`,
    vehicleType: "Van", // Include all vehicle types
    lastUpdatedTime: new Date().toLocaleTimeString(),
  };
}
