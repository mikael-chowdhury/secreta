import ws from "ws";
import { ServerEvent, ServerEventPayload } from "./ServerEvent";
import { IUser } from "./User";

class ServerManager {
  static connections: ws[] = [];

  static sendMessageAll(message: Buffer) {
    ServerManager.connections.forEach((socket) => {
      socket.send(message);
    });
  }

  static sendMessageAllExcept(ws: ws.WebSocket, message: Buffer) {
    ServerManager.connections.forEach((socket) => {
      if (socket != ws) {
        socket.send(message);
      }
    });
  }

  static handleJoin(ws: ws.WebSocket, user: IUser) {
    console.log(user);

    ServerManager.connections.push(ws);

    this.sendMessageAllExcept(
      ws,
      ServerEventPayload.toBuffer({
        event: ServerEvent.USERJOINEVENT,
        data: { user },
      })
    );
  }

  static handleLeave(ws: ws.WebSocket) {
    ServerManager.connections.splice(ServerManager.connections.indexOf(ws), 1);
  }
}

export default ServerManager;
