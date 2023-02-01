import Config from "../files/Config";
import Input from "../lib/Input";
import Server from "../lib/Server";
import colors from "colors";

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
        false,
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
              Server.connect(ip);

              console.log(
                colors.green(
                  "type a message and press enter to send into chats " +
                    colors.bold("(messages are undeletable)")
                )
              );

              process.stdin.on("data", (chunk) => {
                const msg = chunk.toString();
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
