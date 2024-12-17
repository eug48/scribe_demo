import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ContextState {
  patientName: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  additionalContext: string;
  pmsContext: string;
  doctorName: string;
}

const initialState: ContextState = {
  patientName: "Alex Lee123",
  dateOfBirth: "3 March 1980",
  age: 64,
  gender: "male",
  additionalContext: "looks more anxious than usual",
  pmsContext: `
    Active conditions:
    - High blood pressure
    - Diabetes

    Prescriptions:
    - Dietary improvement
    - Metformin 2g daily
    - Irbesartan 150mg daily
  `,

  doctorName: "Dr Jo Doe",
};

export const contextSlice = createSlice({
  name: "context",
  initialState,
  reducers: {
    setPmsContext: (state, action: PayloadAction<string>) => {
      state.pmsContext = action.payload;
    },
    setAdditionalContext: (state, action: PayloadAction<string>) => {
      state.additionalContext = action.payload;
    },
  },
});

export const contextActions = contextSlice.actions;

export default contextSlice.reducer;
