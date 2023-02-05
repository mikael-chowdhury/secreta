"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Payload {
    static toBuffer(payload) {
        return Buffer.from(JSON.stringify(payload));
    }
    static fromBuffer(buffer) {
        return JSON.parse(buffer.toString());
    }
}
exports.default = Payload;
