import ws from "ws";
import { ClientEventPayload } from "./lib/ClientEvent";

import Payload from "./lib/Payload";
import ServerManager from "./lib/ServerManager";
import { IUser } from "./lib/User";

const wss = new ws.WebSocketServer({
  port: 8080,
});

wss.on("connection", (ws) => {
  ws.on("message", (msg) => {
    ws.removeAllListeners();
    let userInformation = ClientEventPayload.fromBuffer(
      Buffer.from(msg.toString())
    );

    ServerManager.handleJoin(ws, userInformation.data as IUser);

    console.log("connection received");

    ws.on("message", (msg) => {
      console.log(Payload.fromBuffer(Buffer.from(msg.toString())));

      ws.send(msg);
    });

    ws.on("close", () => {});
  });
});

wss.on("error", (error) => {
  console.error(error);
});

wss.on("listening", () => {
  console.log("started socket server on port 8080");
});
