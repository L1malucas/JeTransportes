export default async function sendLocation(
  latitude: number,
  longitude: number
) {
  // This function will be implemented in the next step
}
// services/sendLocation.ts
import { io } from "socket.io-client";

const socket = io("http://192.168.1.106:3001");

const getTimestamp = () => new Date().toLocaleString();

export const sendLocationToServer = (
  latitude: number,
  longitude: number,
  currentAddress: string | null,
  vehicleType: string,
  lastUpdatedTime: string
) => {
  console.log(`[${getTimestamp()}] Enviando localização para o servidor:`, {
    latitude,
    longitude,
    currentAddress,
    vehicleType,
    lastUpdatedTime,
  });
  socket.emit("location", {
    latitude,
    longitude,
    currentAddress,
    vehicleType,
    lastUpdatedTime,
  });
};

socket.on("locationUpdate", (data) => {
  console.log(
    `[${getTimestamp()}] Atualização de localização recebida no mobile:`,
    data
  );
});
