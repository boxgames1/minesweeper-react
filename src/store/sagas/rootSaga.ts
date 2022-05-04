import { takeLatest } from "redux-saga/effects";
import { watchOnGame, handleCreateGame } from "../../game/actions";
import { createGame, initialiazeGame } from "../../game/reducers";

export function* watcherSaga() {
  yield takeLatest(initialiazeGame.type, watchOnGame);
  yield takeLatest(createGame.type, handleCreateGame);
}
