import { createServer } from "http";
import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";
import { PORT } from "./service/config.js";

const app = express();
const server = createServer(app);
const socket = new WebSocketServer({ server });

app.use(express.json());
app.use(cors());

socket.on("connection", (ws) => {
  ws.on("message", (data) => {});
  ws.on("close", (data) => {
    console.log(data);
  });
});

server.listen(PORT, () => console.log(`server stared at ${PORT}`));
