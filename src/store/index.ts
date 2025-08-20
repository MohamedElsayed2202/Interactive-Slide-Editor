import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import slideReducer from "./slices/slides";
import clipboardReducer from "./slices/clipboard";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    slide: slideReducer,
    clipboard: clipboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
