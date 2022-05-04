class WsClient {
  private static _socket: WebSocket;

  public static get socket() {
    return this._socket;
  }

  public static set socket(socketConnection: WebSocket) {
    this._socket = socketConnection;
  }

  public static createConnection(url: string) {
    if (!url) throw new Error("WS url is required");
    if (WsClient.socket) {
      return WsClient.socket;
    }
    const socketConnection = new WebSocket(url);
    WsClient.socket = socketConnection;
    return WsClient.socket;
  }

  public static createGame(level: string) {
    if (WsClient.socket) {
      return WsClient.socket.send(`new ${level}`);
    }
  }

  public static sendMap() {
    if (WsClient.socket) {
      return WsClient.socket.send(`map`);
    }
  }

  public static clickCell(x: number, y: number) {
    if (WsClient.socket) {
      return WsClient.socket.send(`open ${x} ${y}`);
    }
  }
}

export default WsClient;
