import Config from "../files/Config";
import Input from "../lib/Input";
import Server from "../lib/Server";
import colors from "colors";
import Payload from "../lib/Payload";
import { ServerEventPayload } from "../lib/ServerEvent";
import { ClientEvent, ClientEventPayload } from "../lib/ClientEvent";
import { IUser } from "../lib/User";

class Menu {
  static async init() {
    console.clear();
    async function menuLoop() {
      console.log(`
      ##################
      ###### MENU ######
      ##################
  
      
      `);

      const option = await Input.getInput(
        "Select one of the following:\n1. Server List\n2. Join Server\n3. Enter Chatroom",
        true,
        false,
        false
      );

      if (
        !isNaN(parseInt(option)) &&
        parseInt(option) <= 3 &&
        parseInt(option) >= 1
      ) {
        switch (parseInt(option)) {
          case 1:
            Config.ConfigObject.servers?.forEach((server, index) => {
              console.log(index + 1 + ". " + server.name);
            });
            break;
          case 2:
            const ip = await Input.getInput(
              "IP-Address of the server (press enter if you want to go back)",
              false,
              true,
              false
            );

            if (ip.trim() == "") {
              Menu.init();
            } else {
              const ws = await Server.connect(ip);

              ws.send(
                ClientEventPayload.toBuffer({
                  event: ClientEvent.JOINEVENT,
                  data: { username: Config.ConfigObject.username } as IUser,
                })
              );

              console.log(
                colors.green(
                  "type a message and press enter to send into chats " +
                    colors.bold("(messages are undeletable)")
                )
              );

              process.stdin.on("data", (chunk) => {
                const msg = chunk.toString();
                ws.send(
                  Payload.toBuffer({
                    author: Config.ConfigObject.username as string,
                    message: msg.trim(),
                  })
                );
              });

              ws.on("message", (data) => {
                const serverEvent = ServerEventPayload.fromBuffer(
                  Buffer.from(data.toString())
                );

                if (serverEvent.author != Config.ConfigObject.username) {
                  console.log(
                    colors.cyan(
                      colors.bold(serverEvent.author + " -> ") +
                        serverEvent.message
                    )
                  );
                }
              });
            }

            break;
        }
      } else {
        console.log("please select a valid menu option");
        setTimeout(() => {
          console.clear();
          menuLoop();
        }, 3000);
      }
    }

    menuLoop();
  }
}

export default Menu;
