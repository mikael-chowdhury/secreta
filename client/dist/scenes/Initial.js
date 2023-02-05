"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Input_1 = __importDefault(require("../lib/Input"));
const ProgramData_1 = __importDefault(require("../files/ProgramData"));
const Config_1 = __importDefault(require("../files/Config"));
const Crypt_1 = __importDefault(require("../lib/Crypt"));
const Menu_1 = __importDefault(require("./Menu"));
class Initial {
    static init() {
        return __awaiter(this, void 0, void 0, function* () {
            console.clear();
            ProgramData_1.default.init();
            Config_1.default.init();
            const name = yield Input_1.default.getInput("Wagwan my g, whats yo name?", true);
            Config_1.default.write("name", name);
            console.clear();
            let username = yield Input_1.default.getInput("You man go by any other names? (press enter if you don't)");
            username = username == "" ? name : username;
            Config_1.default.write("username", username);
            console.clear();
            const password = yield Input_1.default.getInput("Enter password (hidden)", false, true, true);
            let hash = yield Crypt_1.default.hash(password);
            Config_1.default.write("password", hash);
            Menu_1.default.init();
            return;
        });
    }
}
exports.default = Initial;
