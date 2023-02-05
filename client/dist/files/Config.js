"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ProgramData_1 = __importDefault(require("./ProgramData"));
class Config {
    static init() {
        fs_1.default.writeFileSync(Config.FILE, "{}");
        Config.AbsConfigObject = {};
    }
    static load() {
        Config.AbsConfigObject = JSON.parse(fs_1.default.readFileSync(Config.FILE).toString());
        Config.ConfigObject = Config.AbsConfigObject;
    }
    static updateFile() {
        fs_1.default.writeFileSync(Config.FILE, JSON.stringify(this.AbsConfigObject, null, 4));
    }
    static write(key, value) {
        Config.AbsConfigObject[key] = value;
        Config.ConfigObject[key] = value;
        Config.updateFile();
    }
}
Config.FILE = path_1.default.join(ProgramData_1.default.FOLDER, "config.json");
Config.ConfigObject = {};
Config.AbsConfigObject = {};
exports.default = Config;
