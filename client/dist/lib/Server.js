"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const ws_1 = __importDefault(require("ws"));
class Server {
    static connect(ip) {
        return new Promise((res, rej) => {
            const client = new ws_1.default.WebSocket(ip);
            client.on("error", (err) => {
                console.error(err);
            });
            client.on("close", () => {
                console.log(colors_1.default.red("disconnected to server"));
            });
            client.on("open", () => {
                res(client);
                console.log(colors_1.default.bold(colors_1.default.green("< connected to server >")));
            });
        });
    }
}
exports.default = Server;
