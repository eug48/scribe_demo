import { all } from "redux-saga/effects";
import { watchDictationSagas } from "./dictationSaga";
import { llmSaga } from "./llmSaga";

export function* rootSaga() {
  yield all([watchDictationSagas(), llmSaga()]);
}
