import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"],
  },
});

// Função para obter timestamp atual
const getTimestamp = () => new Date().toLocaleString();

// Armazenando os dados do usuário
const userData = new Map<string, any>(); // Mapa para armazenar os dados de cada usuário (socket.id -> informações do usuário)

io.on("connection", (socket) => {
  console.log(`[${getTimestamp()}] Usuário conectado:`, socket.id);

  // Evento para receber a localização e outras informações
  socket.on("location", (data) => {
    console.log(`[${getTimestamp()}] Localização recebida do cliente:`, data);

    // Salvar os dados do usuário no mapa
    userData.set(socket.id, {
      latitude: data.latitude,
      longitude: data.longitude,
      currentAddress: data.currentAddress,
      vehicleType: data.vehicleType,
      lastUpdatedTime: data.lastUpdatedTime,
    });

    // Emitir as informações para todos os outros clientes
    io.emit("locationUpdate", data);

    // Exibir as informações de localização com dados adicionais
    console.log(
      `[${getTimestamp()}] Informações do usuário ${socket.id}:`,
      userData.get(socket.id)
    );
  });

  // Evento de desconexão
  socket.on("disconnect", () => {
    console.log(`[${getTimestamp()}] Usuário desconectado:`, socket.id);

    // Remover os dados do usuário quando ele desconectar
    userData.delete(socket.id);
  });
});

server.listen(3001, "0.0.0.0", () => {
  console.log(`[${getTimestamp()}] Servidor rodando na porta 3001`);
});
