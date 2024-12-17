import {
  takeLatest,
  put,
  call,
  take,
  race,
  cancelled,
} from "redux-saga/effects";
import { eventChannel, EventChannel, END } from "redux-saga";
import { dictationActions } from "../slices/dictationState";

type SpeechRecognitionResult = string | Error;

function createSpeechRecognitionChannel(): EventChannel<SpeechRecognitionResult> {
  return eventChannel<SpeechRecognitionResult>((emit) => {
    if (!window.webkitSpeechRecognition) {
      emit(new Error("Speech recognition is not supported in this browser"));
      emit(END);
      return () => {};
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-AU";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      console.debug("Speech recognition result", event);
      const result = Array.from(event.results)
        .map(
          (result) => result[0].transcript.trim() + (result.isFinal ? "\n" : "")
        )
        .join("");
      emit(result);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.warn("Speech recognition error", event);
      emit(new Error(event.error));
    };

    recognition.start();
    console.log("Speech recognition started");

    return () => {
      recognition.stop();
      console.log("Speech recognition stopped");
    };
  });
}

function* handleSpeechRecognition(): Generator<any, void, any> {
  const channel: EventChannel<SpeechRecognitionResult> = yield call(
    createSpeechRecognitionChannel
  );
  try {
    while (true) {
      const result: SpeechRecognitionResult = yield take(channel);
      if (result instanceof Error) {
        yield put(dictationActions.setError(result.message));
      } else if (typeof result === "string") {
        yield put(dictationActions.setText(result));
      } else {
        console.warn(
          "handleSpeechRecognition: unknown result type",
          result,
          typeof result
        );
      }
    }
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}

function* handleStartRecording() {
  try {
    yield race({
      task: call(handleSpeechRecognition),
      cancel: take(dictationActions.stopRecording.type),
    });
  } catch (error) {
    yield put(
      dictationActions.setError(
        error instanceof Error ? error.message : "An error occurred"
      )
    );
  }
}

export function* watchDictationSagas() {
  yield takeLatest(dictationActions.startRecording.type, handleStartRecording);
}
