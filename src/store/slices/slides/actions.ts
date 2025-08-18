import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  ErrorResponse,
  ExtraModification,
  FilterData,
  ListPayload,
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

export const getById = createAsyncThunk<Slide, string, ExtraModification>(
  "slides/get-by-id",
  async (id, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const record = state.slide.records.find((r) => r.id === id);
      await new Promise((res) => setTimeout(res, 500));
      if (!record) {
        return rejectWithValue({ message: `Slide with id ${id} not found` });
      }
      return record;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error?.response?.data);
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);
