import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OutputState {
  error: string | null;
  loading: boolean;
  output: string;
}

const initialState: OutputState = {
  error: null,
  loading: false,
  output: "",
};

export const outputSlice = createSlice({
  name: "output",
  initialState,
  reducers: {
    setOutput: (state, action: PayloadAction<string>) => {
      state.output = action.payload;
      state.error = null;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const outputActions = outputSlice.actions;

export default outputSlice.reducer;
