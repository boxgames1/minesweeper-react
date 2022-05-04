import { take, put, call, apply, fork } from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import WsClient from "../infrastructure/WsClient";
import { setMap, updateMessage } from "./reducers";
import { WEBSOCKET_MINESWEEPER_ENDPOINT } from "../infrastructure/constants";

function createSocketChannel(socket: WebSocket) {
  return eventChannel((emit) => {
    const handleOnMessage = (event: MessageEvent) => {
      emit(event.data);
    };
    const onError = (errorEvent: Event) => {
      emit(new Error(errorEvent?.type || "UKNOWN"));
    };

    socket.addEventListener("message", handleOnMessage);
    socket.addEventListener("error", onError);

    const unsubscribe = () => {
      socket.removeEventListener("message", handleOnMessage);
      socket.removeEventListener("error", onError);
    };

    return unsubscribe;
  });
}

function* getMap() {
  yield apply(WsClient, WsClient.sendMap, []);
}

export function* handleCreateGame(action: any) {
  yield apply(WsClient, WsClient.createGame, [action.payload]);
}

export function* watchOnGame(): Generator<any, void, WebSocket & string> {
  const socket: WebSocket = yield call(
    WsClient.createConnection,
    WEBSOCKET_MINESWEEPER_ENDPOINT
  );
  const socketChannel = yield call(createSocketChannel, socket);

  while (true) {
    try {
      const data = yield take(socketChannel);
      if (data.includes("map:")) {
        yield put(setMap(data));
      }
      if (data.includes("new:")) {
        yield fork(getMap);
      }
      if (data.includes("open:")) {
        yield put(updateMessage(data.split("open: ")[1]));
        yield fork(getMap);
      }
    } catch (err) {
      console.error("socket error:", err);
      socketChannel.close();
    }
  }
}
