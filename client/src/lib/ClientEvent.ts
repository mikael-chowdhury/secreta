enum ClientEvent {
  JOINEVENT,
  LEAVEEVENT,
}

interface IClientEventPayload {
  event: ClientEvent;
  data: object;
}

class ClientEventPayload {
  static toBuffer(payload: IClientEventPayload) {
    return Buffer.from(JSON.stringify(payload));
  }

  static fromBuffer(buffer: Buffer) {
    return JSON.parse(buffer.toString());
  }
}

export { ClientEvent, IClientEventPayload, ClientEventPayload };
