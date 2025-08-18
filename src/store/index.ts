import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import slideReducer from "./slices/slides";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    slide: slideReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
