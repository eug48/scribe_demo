import { contextActions } from "@/state/slices/contextState";
import { RootState } from "@/state/store";
import { TextColumn } from "./TextColumn";

import css from "./ContextColumn.module.scss";

export function AdditionalInfoColumn() {
  return (
    <div className={css.additionalInfoContainer}>
      <TextColumn {...sections.additional} />
    </div>
  );
}

export function PMSContextColumn() {
  return <TextColumn {...sections.pms} />;
}

const sections = {
  additional: {
    title: "Additional info",
    selector: (state: RootState) => state.context.additionalContext,
    action: contextActions.setAdditionalContext,
  },
  pms: {
    title: "Data from medical record",
    selector: (state: RootState) => state.context.pmsContext,
    action: contextActions.setPmsContext,
  },
};
