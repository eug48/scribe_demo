import { useAppSelector } from "@/state/hooks";

import css from "./PatientDetails.module.scss";

export function PatientDetails() {
  const context = useAppSelector((state) => state.context);

  return (
    <div className={css.container}>
      <h1 className="title">{context.patientName}</h1>
      <h2 className="subtitle">{context.dateOfBirth}</h2>
      <h2 className="subtitle">
        ({context.age} years old, {context.gender})
      </h2>
    </div>
  );
}
