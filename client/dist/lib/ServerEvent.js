"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerEventPayload = exports.ServerEvent = void 0;
var ServerEvent;
(function (ServerEvent) {
    ServerEvent[ServerEvent["USERJOINEVENT"] = 0] = "USERJOINEVENT";
    ServerEvent[ServerEvent["USERLEAVEEVENT"] = 1] = "USERLEAVEEVENT";
})(ServerEvent || (ServerEvent = {}));
exports.ServerEvent = ServerEvent;
class ServerEventPayload {
    static toBuffer(payload) {
        return Buffer.from(JSON.stringify(payload));
    }
    static fromBuffer(buffer) {
        return JSON.parse(buffer.toString());
    }
}
exports.ServerEventPayload = ServerEventPayload;
