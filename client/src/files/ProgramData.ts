import process from "process";
import fs from "fs";
import path from "path";

class ProgramData {
  static FOLDER = path.join(process.env.APPDATA as string, "secreta");

  static firstLoad: boolean;

  static init() {
    if (fs.existsSync(ProgramData.FOLDER)) {
      fs.rmSync(ProgramData.FOLDER, { recursive: true, force: true });
    }

    fs.mkdirSync(ProgramData.FOLDER);
  }

  static isFirstLoad(): boolean {
    return !fs.existsSync(ProgramData.FOLDER);
  }
}

export default ProgramData;
