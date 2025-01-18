import { createServer } from "http";
import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";
import { PORT } from "./service/config.js";
import router from "./route.js";
import errorHandling from "./service/errorHandling.js";
import { getData } from "./service/cleandata.js";

const app = express();
const server = createServer(app);
export const socket = new WebSocketServer({ server });

app.use(express.json());
app.use(cors());
app.use("/api", router);
app.use(errorHandling);

socket.on("connection", (ws) => {
  ws.on("close", (data) => {
    console.log(data);
  });
});

getData();

server.listen(PORT, () => console.log(`server stared at ${PORT}`));
