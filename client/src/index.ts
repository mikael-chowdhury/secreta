import Config from "./files/Config";
import ProgramData from "./files/ProgramData";
import Initial from "./scenes/Initial";
import Login from "./scenes/Login";

if (ProgramData.isFirstLoad()) Initial.init();
else {
  Config.load();
  Login.init();
}
