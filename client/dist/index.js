"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProgramData_1 = __importDefault(require("./files/ProgramData"));
const CredentialMenu_1 = __importDefault(require("./scenes/CredentialMenu"));
const Initial_1 = __importDefault(require("./scenes/Initial"));
if (ProgramData_1.default.isFirstLoad())
    Initial_1.default.init();
else {
    CredentialMenu_1.default.init();
}
