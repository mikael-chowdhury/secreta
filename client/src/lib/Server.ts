import colors from "colors";
import ws from "ws";

interface ServerSchema {
  name?: string;
  ip?: string;
}

class Server {
  public static connect(ip: string): Promise<ws> {
    return new Promise((res, rej) => {
      const client = new ws.WebSocket(ip);

      client.on("error", (err) => {
        console.error(err);
      });

      client.on("close", () => {
        console.log(colors.red("disconnected to server"));
      });

      client.on("open", () => {
        res(client);
        console.log(colors.bold(colors.green("< connected to server >")));
      });
    });
  }
}

export { ServerSchema };
export default Server;
