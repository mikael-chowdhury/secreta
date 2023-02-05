"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientEventPayload = exports.ClientEvent = void 0;
var ClientEvent;
(function (ClientEvent) {
    ClientEvent[ClientEvent["JOINEVENT"] = 0] = "JOINEVENT";
    ClientEvent[ClientEvent["LEAVEEVENT"] = 1] = "LEAVEEVENT";
})(ClientEvent || (ClientEvent = {}));
exports.ClientEvent = ClientEvent;
class ClientEventPayload {
    static toBuffer(payload) {
        return Buffer.from(JSON.stringify(payload));
    }
    static fromBuffer(buffer) {
        return JSON.parse(buffer.toString());
    }
}
exports.ClientEventPayload = ClientEventPayload;
