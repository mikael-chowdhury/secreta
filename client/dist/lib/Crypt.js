"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Config_1 = __importDefault(require("../files/Config"));
class Crypt {
    static hash(password) {
        return new Promise((res, rej) => {
            bcryptjs_1.default.genSalt(10, (err, salt) => {
                if (err)
                    return res(err);
                bcryptjs_1.default.hash(password, salt, (err, hash) => {
                    if (err)
                        return res(err);
                    return res(hash);
                });
            });
        });
    }
    static validPassword(password) {
        console.log("\n", password, Config_1.default.ConfigObject.password);
        return bcryptjs_1.default.compareSync(password, Config_1.default.ConfigObject.password);
    }
}
exports.default = Crypt;
