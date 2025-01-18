import { createServer } from "http";
import express from "express";
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

app.get("/", (req, res) => {
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

setInterval(() => {
  socket.clients.forEach((client) => {
    client.send(
      JSON.stringify({
        event: "newStories",
        id: 13,
        title: "DoubleClickjacking: A New type of web hacking technique",
        link: "https://www.paulosyibelo.com/2024/12/doubleclickjacking-what.html",
        site: "paulosyibelo.com",
        upvotes: 169,
        postTime: 1736829846,
        postedAt: "2025-01-13T23:14:06.000Z",
        createdAt: "2025-01-18T05:29:45.000Z",
      })
    );
  });
}, 1000 * 10);

//getData();

server.listen(PORT, () => console.log(`server stared at ${PORT}`));
