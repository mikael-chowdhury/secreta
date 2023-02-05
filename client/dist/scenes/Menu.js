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
const Server_1 = __importDefault(require("../lib/Server"));
const colors_1 = __importDefault(require("colors"));
const Payload_1 = __importDefault(require("../lib/Payload"));
const ServerEvent_1 = require("../lib/ServerEvent");
const ClientEvent_1 = require("../lib/ClientEvent");
const CredentialMenu_1 = __importDefault(require("./CredentialMenu"));
class Menu {
    static init() {
        return __awaiter(this, void 0, void 0, function* () {
            console.clear();
            function menuLoop() {
                return __awaiter(this, void 0, void 0, function* () {
                    console.log(`
      ##################
      ###### MENU ######
      ##################
  
      
      `);
                    const option = yield Input_1.default.getInput("Select one of the following:\n1. Join Server\n2. Logout\n", true, false, false);
                    if (!isNaN(parseInt(option)) &&
                        parseInt(option) <= 3 &&
                        parseInt(option) >= 1) {
                        switch (parseInt(option)) {
                            case 1:
                                const ip = yield Input_1.default.getInput("IP-Address of the server (press enter if you want to go back)", false, true, false);
                                if (ip.trim() == "") {
                                    Menu.init();
                                }
                                else {
                                    console.clear();
                                    const ws = yield Server_1.default.connect(ip);
                                    ws.send(ClientEvent_1.ClientEventPayload.toBuffer({
                                        event: ClientEvent_1.ClientEvent.JOINEVENT,
                                        data: { username: Config_1.default.ConfigObject.username },
                                    }));
                                    console.log(colors_1.default.green("type a message and press enter to send into chats " +
                                        colors_1.default.bold("(messages are undeletable)")));
                                    process.stdin.on("data", (chunk) => {
                                        const msg = chunk.toString();
                                        ws.send(Payload_1.default.toBuffer({
                                            author: Config_1.default.ConfigObject.username,
                                            message: msg.trim(),
                                        }));
                                    });
                                    ws.on("message", (data) => {
                                        const serverEvent = ServerEvent_1.ServerEventPayload.fromBuffer(Buffer.from(data.toString()));
                                        if ("event" in serverEvent) {
                                            if (serverEvent.event == ServerEvent_1.ServerEvent.USERJOINEVENT) {
                                                const user = serverEvent.data;
                                                console.log(colors_1.default.bold(colors_1.default.green(`< ${user.username} JOINED THE CHAT >`)));
                                            }
                                            else if (serverEvent.event == ServerEvent_1.ServerEvent.USERLEAVEEVENT) {
                                                const user = serverEvent.data;
                                                console.log(colors_1.default.bold(colors_1.default.red(`< ${user.username} LEFT THE CHAT >`)));
                                            }
                                        }
                                        else {
                                            const event = serverEvent;
                                            if (event.author != Config_1.default.ConfigObject.username) {
                                                console.log(colors_1.default.cyan(colors_1.default.bold(event.author + " -> ") + event.message));
                                            }
                                        }
                                    });
                                }
                                break;
                            case 2:
                                CredentialMenu_1.default.init();
                                break;
                        }
                    }
                    else {
                        console.log("please select a valid menu option");
                        setTimeout(() => {
                            console.clear();
                            menuLoop();
                        }, 3000);
                    }
                });
            }
            menuLoop();
        });
    }
}
exports.default = Menu;
