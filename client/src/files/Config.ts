import fs from "fs";
import path from "path";
import ProgramData from "./ProgramData";

interface ConfigSchema {
  name?: string;
  username?: string;
  password?: string;
}

class Config {
  static FILE = path.join(ProgramData.FOLDER, "config.json");
  static ConfigObject: ConfigSchema = {};

  static init() {
    fs.writeFileSync(Config.FILE, "{}");
    Config.ConfigObject = {};
  }

  static load() {
    Config.ConfigObject = JSON.parse(fs.readFileSync(Config.FILE).toString());
  }

  static updateFile() {
    fs.writeFileSync(Config.FILE, JSON.stringify(this.ConfigObject, null, 4));
  }

  static write(key: keyof ConfigSchema, value: any) {
    Config.ConfigObject[key] = value;
    Config.updateFile();
  }
}

export default Config;
