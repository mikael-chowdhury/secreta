import ws from "ws";

const wss = new ws.WebSocketServer({
  port: 8080,
});

wss.on("connection", (ws) => {
  console.log("connection received");

  ws.on("message", (msg) => {
    console.log(msg.toString());

    ws.send(msg);
  });
});

wss.on("error", (error) => {
  console.error(error);
});

wss.on("listening", () => {
  console.log("started socket server on port 8080");
});
