import Config from "../files/Config";
import ProgramData from "../files/ProgramData";
import Input from "../lib/Input";
import Menu from "./Menu";
import bcrypt from "bcrypt";

class Login {
  static async init() {
    console.clear();

    console.log(ProgramData.FOLDER);
    console.log(Config.ConfigObject.username);

    async function passwordLoop() {
      const password = await Input.getInput(
        "Password (hidden)",
        false,
        true,
        true
      );
      if (
        bcrypt.compareSync(password, Config.ConfigObject.password as string)
      ) {
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
