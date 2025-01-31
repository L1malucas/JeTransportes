"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const http = require("http").createServer(app);
const io = new socket_io_1.Server(http);
app.get("/", (req, res) => {
    res.send("Bus Tracking Server");
});
io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("location", (data) => {
        console.log("Location Data:", data);
        // Send to all clients
        io.emit("locationUpdate", data);
    });
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});
const PORT = process.env.PORT || 3001;
http.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
