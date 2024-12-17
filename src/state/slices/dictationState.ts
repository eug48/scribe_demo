import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DictationState {
  text: string;
  isRecording: boolean;
  error: string | null;
}

const initialState: DictationState = {
  text: `
  Hi Alex, how are you doing?

  I'm alright. Really hot day today... Going to be an even hotter week!

  Yes, really grateful to have the fans and air-con!

  How has your blood pressure been?

  It's actually much better... The new tablets seem to be helping

  Are you still measuring it?

  Yes, before bed. It's usually around 130 to 140.

  Okay, that is better.

  Well, what have you come in for today?

  Actually my sleep hasn't been so good.
  I've been feeling more tired, lacking energy.
  And my friends have noticed that I'm often dozing off! It's really embarassing.

  When and how often has this happened?

  A couple of times when just listening to a conversation at the dinner table..
  A couple of times recently while watching TV

  Oh, right, that doesn't sound good.
  How long has this been happening?

  It's been going on for about a month now.

  Do you have trouble falling asleep?

  No, I'm just tired.

  Okay, given your risk factors I'm going to have to refer you to a sleep study.

  Write a letter to a sleep physician requesting a sleep study for this patient
  given that they're experiencing daytime sleepiness.
  `.trim(),

  isRecording: false,
  error: null,
};

export const dictationSlice = createSlice({
  name: "dictation",
  initialState,
  reducers: {
    startRecording: (state) => {
      state.isRecording = true;
      state.error = null;
    },
    stopRecording: (state) => {
      state.isRecording = false;
    },
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isRecording = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const dictationActions = dictationSlice.actions;

export default dictationSlice.reducer;
