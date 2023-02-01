import Config from "./files/Config";
import ProgramData from "./files/ProgramData";
import Input from "./lib/Input";
import Initial from "./scenes/Initial";
import Login from "./scenes/Login";

if (ProgramData.isFirstLoad()) Initial.init();
else {
  Config.load();
  Login.init();
}
