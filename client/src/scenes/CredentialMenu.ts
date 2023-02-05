import Config from "../files/Config";
import Input from "../lib/Input";
import Login from "./Login";
import Menu from "./Menu";

class CredentialMenu {
  static init() {
    console.clear();

    async function optionLoop() {
      console.clear();
      let option = await Input.getInput(
        "Select one of the following:\n\n1. Login\n2. Login as guest\n"
      );

      if (!isNaN(parseInt(option))) {
        const optionnum = parseInt(option);

        if (optionnum >= 1 && optionnum <= 2) {
          if (optionnum == 1) {
            Config.load();
            Login.init();
          } else if (optionnum == 2) {
            Config.ConfigObject.username =
              "guest" + Math.floor(Math.random() * 10000);
            Config.ConfigObject.servers = [];
            Menu.init();
          }
        } else optionLoop();
      } else optionLoop();
    }

    optionLoop();
  }
}

export default CredentialMenu;
