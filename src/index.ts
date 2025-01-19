import { createServer } from "http";
import express, { Request, Response } from "express";
import cors from "cors";
import { WebSocketServer } from "ws";
import { PORT } from "./utils/config.js";
import router from "./route.js";
import { getData } from "./utils/cleandata.js";
import path from "path";

const app = express();
const server = createServer(app);
export const socket = new WebSocketServer({ server });

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(import.meta.dirname, "./view")));

app.get("/", (req: Request, res: Response) => {
  return res
    .status(200)
    .sendFile(path.join(import.meta.dirname, "./view/index.html"));
});

app.use("/api", router);

socket.on("connection", (ws) => {
  ws.on("close", (data) => {
    console.log(data);
  });
});

getData();

server.listen(PORT, () => console.log(`server stared at ${PORT}`));
