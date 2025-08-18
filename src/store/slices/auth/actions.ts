import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios-instance";
import { isAxiosError } from "axios";
import type {
    ErrorResponse,
    GetUserPayload,
    loginFormValues,
    LoginPayload,
    LogoutPayload,
} from "../../../utils/interfaces";

export const login = createAsyncThunk<
  LoginPayload,
  loginFormValues,
  ErrorResponse
>("auth/login", async (values, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post("login", values);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error?.response?.data);
    }
    return rejectWithValue({ message: "An unknown error occurred" });
  }
});

export const getUser = createAsyncThunk<GetUserPayload, void, ErrorResponse>(
  "auth/get-user",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("user-data");
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error?.response?.data);
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

export const logout = createAsyncThunk<LogoutPayload, void, ErrorResponse>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("logout");
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error?.response?.data);
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);
