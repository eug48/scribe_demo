import React from "react";

import css from "./DictationColumn.module.scss";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { dictationActions } from "@/state/slices/dictationState";

export function DictationColumn() {
  const dispatch = useAppDispatch();

  const isRecording = useAppSelector((state) => state.dictation.isRecording);
  const dictatedText = useAppSelector((state) => state.dictation.text);

  const startRecording = React.useCallback(() => {
    dispatch(dictationActions.startRecording());
  }, [dispatch]);

  const pauseRecording = React.useCallback(() => {
    dispatch(dictationActions.stopRecording());
  }, [dispatch]);

  const clear = React.useCallback(() => {
    dispatch(dictationActions.setText(""));
  }, [dispatch]);

  return (
    <div className={css.container}>
      <div className={css.buttonContainer}>
        {!isRecording && (
          <button className="button is-primary" onClick={startRecording}>
            {dictatedText ? "🎤 Resume" : "🎤 Start recording"}
          </button>
        )}
        {isRecording && (
          <button className="button" onClick={pauseRecording}>
            ⏸️ Pause
          </button>
        )}

        {!isRecording && dictatedText && (
          <button className="button" onClick={clear}>
            🗑️ Clear
          </button>
        )}

        {/* only show consent warning at the beginning when there is no dictated text */}
        {!isRecording && !dictatedText && (
          <div className={css.consentWarning}>Patient consent required</div>
        )}
      </div>

      {/* TODO: allow users to edit the dictated text in case they make a mistake */}
      <textarea className="textarea" value={dictatedText} readOnly></textarea>
    </div>
  );
}
