import Config from "../files/Config";
import Input from "../lib/Input";
import Server from "../lib/Server";
import colors from "colors";
import Payload, { IPayload } from "../lib/Payload";
import { ServerEvent, ServerEventPayload } from "../lib/ServerEvent";
import { ClientEvent, ClientEventPayload } from "../lib/ClientEvent";
import { IUser } from "../lib/User";
import CredentialMenu from "./CredentialMenu";

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
        "Select one of the following:\n1. Join Server\n2. Logout\n",
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
            const ip = await Input.getInput(
              "IP-Address of the server (press enter if you want to go back)",
              false,
              true,
              false
            );

            if (ip.trim() == "") {
              Menu.init();
            } else {
              console.clear();
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

                if ("event" in serverEvent) {
                  if (serverEvent.event == ServerEvent.USERJOINEVENT) {
                    const user = serverEvent.data as IUser;
                    console.log(
                      colors.bold(
                        colors.green(`< ${user.username} JOINED THE CHAT >`)
                      )
                    );
                  } else if (serverEvent.event == ServerEvent.USERLEAVEEVENT) {
                    const user = serverEvent.data as IUser;
                    console.log(
                      colors.bold(
                        colors.red(`< ${user.username} LEFT THE CHAT >`)
                      )
                    );
                  }
                } else {
                  const event = serverEvent as unknown as IPayload;
                  if (event.author != Config.ConfigObject.username) {
                    console.log(
                      colors.cyan(
                        colors.bold(event.author + " -> ") + event.message
                      )
                    );
                  }
                }
              });
            }

            break;
          case 2:
            CredentialMenu.init();
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
