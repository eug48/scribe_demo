import { useAppDispatch, useAppSelector } from "@/state/hooks";

import css from "./TextColumn.module.scss";

import { RootState } from "@/state/store";
import { Action } from "@reduxjs/toolkit";

interface Props {
  title: string;

  // selector to read from state
  // provide either the selector or the raw text
  selector?(state: RootState): string;
  text?: string;

  // redux action to dispatch when textarea changed
  // if null, textarea is read-only
  action?(newValue: string): Action;

  loading?: boolean;

  copyButton?: boolean;
}

export function TextColumn(props: Props) {
  const dispatch = useAppDispatch();

  const text = useAppSelector(
    props.selector ? props.selector : () => props.text!
  );

  function onTextChanged(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const text = event.target.value;
    if (props.action) {
      dispatch(props.action(text));
    }
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className={css.container}>
      <div className={css.headingContainer}>
        <div>{props.title}</div>
        {/* dummy button so header in all columns has the same height */}
        <button className="button is-invisible">Dummy</button>

        {props.copyButton && (
          <button className="button" onClick={copyToClipboard}>
            Copy
          </button>
        )}
      </div>
      <div
        className={`control ${props.loading ? "is-loading" : ""} ${css.textareaContainer}`}
      >
        <textarea
          className="textarea"
          value={text}
          onChange={onTextChanged}
          readOnly={props.action === undefined}
        ></textarea>
      </div>
    </div>
  );
}
