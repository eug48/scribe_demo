import { call, delay, put, select, takeLatest } from "redux-saga/effects";

import { dictationActions } from "../slices/dictationState";
import { outputActions } from "../slices/outputState";
import { contextActions, ContextState } from "../slices/contextState";
import { RootState } from "../store";

export function* llmSaga() {
  // if a new action comes takeLates will cancel the previous requestOutput
  // so that we only have one request running at a time
  // due to the delay at the start of requestOutput this is effectively debouncing
  yield takeLatest(
    [
      dictationActions.setText.type,
      contextActions.setAdditionalContext.type,
      contextActions.setPmsContext.type,
    ],
    requestOutput
  );
}

function* requestOutput() {
  try {
    const dictated: string = yield select(
      (state: RootState) => state.dictation.text
    );
    const context: ContextState = yield select(
      (state: RootState) => state.context
    );

    // don't request output if there is no dictated text
    // even patient consent may not have been obtained
    if (!dictated) {
      return;
    }

    yield put(outputActions.setLoading(true));

    // delay for debouncing
    const delaySeconds = 1;
    yield delay(delaySeconds * 1000);

    const contextForApi = {
      dictated,
      additional: context.additionalContext,
      pms: `
        Name: ${context.patientName}
        Age: ${context.age}
        Current conditions and prescriptions: ${context.pmsContext}

        Doctor's name: ${context.doctorName}
        `.trim(),
    };

    const { output } = yield call(callApi, contextForApi);

    yield put(outputActions.setOutput(output));
  } catch (error) {
    console.error("LLM error:", error);
    yield put(
      outputActions.setError(
        "Error receiving AI output. Please try again soon."
      )
    );
  }
}

async function callApi(context: object) {
  const response = await fetch("/api/llm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(context),
  });

  if (!response.ok) {
    throw new Error("LLM request failed");
  }

  return await response.json();
}
