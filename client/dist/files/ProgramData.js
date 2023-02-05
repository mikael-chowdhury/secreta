"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = __importDefault(require("process"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class ProgramData {
    static init() {
        if (fs_1.default.existsSync(ProgramData.FOLDER)) {
            fs_1.default.rmSync(ProgramData.FOLDER, { recursive: true, force: true });
        }
        fs_1.default.mkdirSync(ProgramData.FOLDER);
    }
    static isFirstLoad() {
        return !fs_1.default.existsSync(ProgramData.FOLDER);
    }
}
ProgramData.FOLDER = path_1.default.join(process_1.default.env.APPDATA ||
    (process_1.default.platform == "darwin"
        ? process_1.default.env.HOME + "/Library/Preferences"
        : process_1.default.env.HOME + "/.local/share"), "secreta");
exports.default = ProgramData;
