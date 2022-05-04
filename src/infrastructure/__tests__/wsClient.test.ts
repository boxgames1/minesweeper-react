import WsClient from "../WsClient";
import { WEBSOCKET_MINESWEEPER_ENDPOINT } from "../constants";

describe("WsClient", () => {
  it("createConnection should throw error if url is empty", () => {
    function createConnection() {
      WsClient.createConnection("");
    }
    expect(createConnection).toThrow(new Error(`WS url is required`));
  });
  it("createConnection should NOT connect to socket with invalid url", () => {
    const url = "invalid_url";
    function createConnection() {
      WsClient.createConnection(url);
    }
    expect(createConnection).toThrow(new Error(`The URL '${url}' is invalid.`));
  });
  it("createConnection should connect to socket with valid url", () => {
    const socket = WsClient.createConnection(WEBSOCKET_MINESWEEPER_ENDPOINT);
    expect(socket).toBe(WsClient.socket);
  });
  it("createConnection should return socket instance if it exist", () => {
    const socket = WsClient.createConnection(WEBSOCKET_MINESWEEPER_ENDPOINT);
    expect(socket).toBe(WsClient.socket);
  });
});
