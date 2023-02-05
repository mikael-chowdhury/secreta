import Config from "./files/Config";
import ProgramData from "./files/ProgramData";
import Input from "./lib/Input";
import CredentialMenu from "./scenes/CredentialMenu";
import Initial from "./scenes/Initial";
import Login from "./scenes/Login";
import Menu from "./scenes/Menu";

if (ProgramData.isFirstLoad()) Initial.init();
else {
  CredentialMenu.init();
}
