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
const Config_1 = __importDefault(require("../files/Config"));
const Input_1 = __importDefault(require("../lib/Input"));
const Login_1 = __importDefault(require("./Login"));
const Menu_1 = __importDefault(require("./Menu"));
class CredentialMenu {
    static init() {
        console.clear();
        function optionLoop() {
            return __awaiter(this, void 0, void 0, function* () {
                console.clear();
                let option = yield Input_1.default.getInput("Select one of the following:\n\n1. Login\n2. Login as guest\n");
                if (!isNaN(parseInt(option))) {
                    const optionnum = parseInt(option);
                    if (optionnum >= 1 && optionnum <= 2) {
                        if (optionnum == 1) {
                            Config_1.default.load();
                            Login_1.default.init();
                        }
                        else if (optionnum == 2) {
                            Config_1.default.ConfigObject.username =
                                "guest" + Math.floor(Math.random() * 10000);
                            Config_1.default.ConfigObject.servers = [];
                            Menu_1.default.init();
                        }
                    }
                    else
                        optionLoop();
                }
                else
                    optionLoop();
            });
        }
        optionLoop();
    }
}
exports.default = CredentialMenu;
