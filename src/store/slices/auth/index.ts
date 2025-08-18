import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getUser, login, logout } from "./actions";
import type { AuthState, User } from "../../../utils/interfaces";

const initialState: AuthState = {
  token: "",
  loginState: {
    error: null,
    loading: false,
    success: false,
  },
  user: {} as User,
  getState: {
    error: null,
    loading: false,
    success: false,
  },
  logoutState: {
    error: null,
    loading: false,
    success: false,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginState.error = null;
        state.loginState.loading = true;
        state.loginState.success = false;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
        state.loginState.error = null;
        state.loginState.loading = false;
        state.loginState.success = true;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loginState.error = payload?.message as string;
        state.loginState.loading = false;
        state.loginState.success = false;
      });
    builder
      .addCase(getUser.pending, (state) => {
        state.getState.error = null;
        state.getState.loading = true;
        state.getState.success = false;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.getState.error = null;
        state.getState.loading = false;
        state.getState.success = true;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.getState.error = payload?.message as string;
        state.getState.loading = false;
        state.getState.success = false;
      });
    builder
      .addCase(logout.pending, (state) => {
        state.logoutState.error = null;
        state.logoutState.loading = true;
        state.logoutState.success = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.logoutState.error = null;
        state.logoutState.loading = false;
        state.logoutState.success = true;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.logoutState.error = payload?.message as string;
        state.logoutState.loading = false;
        state.logoutState.success = false;
      });
  },
});

export const { setToken } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
