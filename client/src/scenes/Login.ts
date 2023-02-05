import Config from "../files/Config";
import ProgramData from "../files/ProgramData";
import Input from "../lib/Input";
import Menu from "./Menu";
import Crypt from "../lib/Crypt";

class Login {
  static async init() {
    console.clear();

    async function passwordLoop() {
      const password = await Input.getInput(
        "Password (hidden)",
        false,
        true,
        true
      );
      if (Crypt.validPassword(password)) {
        Menu.init();
      } else {
        console.log("\nIncorrect Password\n");
        passwordLoop();
      }
    }

    passwordLoop();
  }
}

export default Login;
