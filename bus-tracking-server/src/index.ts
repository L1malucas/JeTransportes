import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://192.168.1.106:3000",
      "https://je-transportes.vercel.app/",
    ], // Allow both localhost and IP
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["my-custom-header"],
  },
  allowEIO3: true, // Enable compatibility with Socket.IO v3 clients
  transports: ["websocket", "polling"], // Enable both WebSocket and polling transport
});

const getTimestamp = () => new Date().toLocaleString();
const userData = new Map<string, any>();

io.on("connection", (socket) => {
  console.log(`[${getTimestamp()}] Usuário conectado:`, socket.id);

  socket.on("location", (data) => {
    console.log(`[${getTimestamp()}] Localização recebida do cliente:`, data);
    userData.set(socket.id, data);
    io.emit("locationUpdate", data);
    console.log(
      `[${getTimestamp()}] Informações do usuário ${socket.id}:`,
      userData.get(socket.id)
    );
  });

  socket.on("disconnect", () => {
    console.log(`[${getTimestamp()}] Usuário desconectado:`, socket.id);
    userData.delete(socket.id);
  });
});

// Add basic Express middleware to handle CORS pre-flight requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

server.listen(3001, "0.0.0.0", () => {
  console.log(`[${getTimestamp()}] Servidor rodando na porta 3001`);
});
