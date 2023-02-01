interface IPayload {
  author: string;
  message: string;
}

class Payload {
  static toBuffer(payload: IPayload) {
    return Buffer.from(JSON.stringify(payload));
  }

  static fromBuffer(buffer: Buffer): IPayload {
    return JSON.parse(buffer.toString());
  }
}

export { IPayload };
export default Payload;
