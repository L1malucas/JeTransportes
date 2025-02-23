import express from "express";
import http from "http";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";

const app = express();
app.use(express.static("./node_modules/@socket.io/admin-ui/ui/dist"));
const server = http.createServer(app);
const expressServer = app.listen(4001);
const io = new Server(expressServer, {
  cors: {
    origin: ["*"],
    credentials: true,
  },
});

instrument(io, {
  auth: false,
  mode: "development",
});

const getTimestamp = () => new Date().toLocaleString();

const userData = new Map();

// Handling new client connection
io.on("connection", (socket) => {
  console.log(`[${getTimestamp()}] Usuário conectado:`, socket.id);

  socket.on("location", (data) => {
    console.log(
      `[${getTimestamp()}] Localização recebida do cliente ${data.clientId}:`,
      data
    );

    // Save/update user data by clientId
    userData.set(data.clientId, {
      latitude: data.latitude,
      longitude: data.longitude,
      currentAddress: data.currentAddress,
      vehicleType: data.vehicleType,
      lastUpdatedTime: data.lastUpdatedTime,
    });

    // Emit the location update to all clients
    io.emit("locationUpdate", data);

    console.log(
      `[${getTimestamp()}] Nova atualização de localização recebida para o cliente ${
        data.clientId
      }:`,
      {
        latitude: data.latitude,
        longitude: data.longitude,
        currentAddress: data.currentAddress,
        vehicleType: data.vehicleType,
        lastUpdatedTime: data.lastUpdatedTime,
      }
    );
  });

  socket.on("disconnect", () => {
    console.log(`[${getTimestamp()}] Usuário desconectado:`, socket.id);
    // Optionally, remove the client from the userData map if necessary
    userData.delete(socket.id);
  });
});

// Listening on port 3001
app.listen(3001, "0.0.0.0", () => {
  console.log(`[${getTimestamp()}] Servidor rodando na porta 3001`);
});
