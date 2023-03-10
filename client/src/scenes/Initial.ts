import Input from "../lib/Input";
import ProgramData from "../files/ProgramData";
import Config from "../files/Config";
import Crypt from "../lib/Crypt";
import Menu from "./Menu";

class Initial {
  static async init() {
    console.clear();

    ProgramData.init();
    Config.init();

    const name = await Input.getInput("Wagwan my g, whats yo name?", true);
    Config.write("name", name);

    console.clear();

    let username = await Input.getInput(
      "You man go by any other names? (press enter if you don't)"
    );
    username = username == "" ? name : username;
    Config.write("username", username);

    console.clear();

    const password = await Input.getInput(
      "Enter password (hidden)",
      false,
      true,
      true
    );
    let hash = await Crypt.hash(password);
    Config.write("password", hash);

    Menu.init();

    return;
  }
}

export default Initial;
