// lib/socket.ts
import { io } from "socket.io-client";

export const socket = io("http://192.168.1.106:3001");

export const listenToLocationUpdates = (callback: (data: any) => void) => {
  socket.on("locationUpdate", callback);
};

export const sendLocation = (
  latitude: number,
  longitude: number,
  currentAddress: string | null,
  vehicleType: string,
  lastUpdatedTime: string
) => {
  socket.emit("location", {
    latitude,
    longitude,
    currentAddress,
    vehicleType,
    lastUpdatedTime,
  });
};
