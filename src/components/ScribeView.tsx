"use client";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import css from "./ScribeView.module.scss";
import { DictationColumn } from "./DictationColumn";
import { AdditionalInfoColumn, PMSContextColumn } from "./ContextColumn";
import { OutputsColumn } from "./OutputsColumn";
import { PatientDetails } from "./PatientDetails";

export default function ScribeView() {
  return (
    <>
      <div className={css.container}>
        <PatientDetails />
        <PanelGroup direction="horizontal">
          <Column>
            <DictationColumn />
          </Column>

          <PanelResizeHandle className={css.resizeHandle} />

          <Column>
            <PanelGroup direction="vertical">
              <Column>
                <AdditionalInfoColumn />
              </Column>
              <PanelResizeHandle className={css.resizeHandleH} />
              <Column>
                <PMSContextColumn />
              </Column>
            </PanelGroup>
          </Column>

          <PanelResizeHandle className={css.resizeHandle} />

          <Column>
            <OutputsColumn />
          </Column>
        </PanelGroup>
      </div>
    </>
  );
}

function Column(props: { children: React.ReactNode }) {
  return (
    <Panel defaultSize={33}>
      <div className={css.panel}>{props.children}</div>
    </Panel>
  );
}
