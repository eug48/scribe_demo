import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./sagas/rootSaga";

import contextReducer from "./slices/contextState";
import dictationReducer from "./slices/dictationState";
import outputReducer from "./slices/outputState";

const rootReducer = combineReducers({
  context: contextReducer,
  dictation: dictationReducer,
  output: outputReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
