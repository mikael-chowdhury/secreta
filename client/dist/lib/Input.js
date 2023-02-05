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
const process_1 = __importDefault(require("process"));
const colors_1 = __importDefault(require("colors"));
const Log_1 = __importDefault(require("./Log"));
class Input {
    static getInput(prompt, inline = false, slowtype = true, silent = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (inline) {
                if (slowtype) {
                    yield Log_1.default.SlowType(colors_1.default.red(prompt + " > "));
                }
                else
                    process_1.default.stdout.write(colors_1.default.red(prompt + " > "));
            }
            else {
                if (slowtype) {
                    yield Log_1.default.SlowType(colors_1.default.red(prompt + " > "));
                }
                else
                    console.log(colors_1.default.red(prompt + " > "));
            }
            if (!silent) {
                return new Promise((res, rej) => {
                    process_1.default.stdin.on("data", (chunk) => {
                        process_1.default.stdin.removeAllListeners();
                        res(chunk.toString().trim());
                    });
                });
            }
            else {
                return new Promise((res, rej) => {
                    let response = "";
                    process_1.default.stdin.setRawMode(true);
                    process_1.default.stdin.on("data", (chunk) => {
                        const resString = chunk.toString();
                        switch (resString) {
                            case "\n":
                            case "\r":
                            case "\u0004":
                                process_1.default.stdin.setRawMode(false);
                                process_1.default.stdin.removeAllListeners();
                                res(response);
                                break;
                            case "\u0003":
                                process_1.default.exit();
                            case "\b":
                                response = response.substring(0, response.length - 1);
                                break;
                            default:
                                response += resString;
                                break;
                        }
                    });
                });
            }
        });
    }
}
exports.default = Input;
