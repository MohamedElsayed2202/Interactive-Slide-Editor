import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  ErrorResponse,
  FilterData,
  ListPayload,
  Media,
  Slide,
} from "../../../utils/interfaces";
import { isAxiosError } from "axios";
import axiosInstance from "../../../utils/axios-instance";

export const list = createAsyncThunk<ListPayload, FilterData, ErrorResponse>(
  "slides/list",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("slides-of-designer", {
        params: {
          page: values.page,
          name: values.name,
        },
      });
      const { records } = data;
      const { total, per_page } = records;
      const totalPages = Math.round(total / per_page);

      return {
        records: records.data.sort((a: Slide, b: Slide) => a.rank - b.rank),
        totalPages,
      };
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error?.response?.data);
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

export const getById = createAsyncThunk<Slide, string, ErrorResponse>(
  "slides/get-by-id",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`slides/${id}`);
      const record = data.slide;
      return record;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error?.response?.data);
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

export const getMedia = createAsyncThunk<Media[], string, ErrorResponse>(
  "slides/get-media",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`media-of-slide/${id}`, {
        params: {
          type: "image",
        },
      });
      const record = data.records.data;
      return record;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error?.response?.data);
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

export const addMedia = createAsyncThunk<
  Media,
  { id: string; body: FormData },
  ErrorResponse
>("slides/add-media", async ({ id, body }, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await axiosInstance.post(
      `attach-media-to-slide/${id}`,
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (data.message) {
      dispatch(getMedia(id));
    }
    const record = data.message;
    return record;
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error?.response?.data);
    }
    return rejectWithValue({ message: "An unknown error occurred" });
  }
});
