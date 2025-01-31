import { io } from "socket.io-client";

// const socket = io("http://192.168.1.106:3001");
const socket = io("https://jetransportes.onrender.com/");

const getTimestamp = () => new Date().toLocaleString();

export const sendLocationToServer = (
  latitude: number,
  longitude: number,
  currentAddress: string,
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
    currentAddress: currentAddress || "Endereço não disponível", // Fallback se o endereço for nulo
    vehicleType: vehicleType || "Desconhecido", // Fallback se o tipo de veículo for nulo
    lastUpdatedTime: lastUpdatedTime || new Date().toLocaleTimeString(), // Garantir que sempre tenha um horário
  });
};

socket.on("locationUpdate", (data) => {
  console.log(
    `[${getTimestamp()}] Atualização de localização recebida no mobile:`,
    data
  );
});
