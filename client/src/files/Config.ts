import fs from "fs";
import path from "path";
import { ServerSchema } from "../lib/Server";
import ProgramData from "./ProgramData";

interface ConfigSchema {
  name?: string;
  username?: string;
  password?: string;
  servers?: ServerSchema[];
}

class Config {
  static FILE = path.join(ProgramData.FOLDER, "config.json");
  static ConfigObject: ConfigSchema = {};
  static AbsConfigObject: ConfigSchema = {};

  static init() {
    fs.writeFileSync(Config.FILE, "{}");
    Config.AbsConfigObject = {};
  }

  static load() {
    Config.AbsConfigObject = JSON.parse(
      fs.readFileSync(Config.FILE).toString()
    );

    Config.ConfigObject = Config.AbsConfigObject;
  }

  static updateFile() {
    fs.writeFileSync(
      Config.FILE,
      JSON.stringify(this.AbsConfigObject, null, 4)
    );
  }

  static write(key: keyof ConfigSchema, value: any) {
    Config.AbsConfigObject[key] = value;
    Config.ConfigObject[key] = value;
    Config.updateFile();
  }
}

export default Config;
