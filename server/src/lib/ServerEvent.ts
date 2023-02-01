enum ServerEvent {
  USERJOINEVENT,
  USERLEAVEEVENT,
}

interface IServerEventPayload {
  event: ServerEvent;
  data: object;
}

class ServerEventPayload {
  static toBuffer(payload: IServerEventPayload) {
    return Buffer.from(JSON.stringify(payload));
  }

  static fromBuffer(buffer: Buffer) {
    return JSON.parse(buffer.toString());
  }
}

export { ServerEvent, IServerEventPayload, ServerEventPayload };
