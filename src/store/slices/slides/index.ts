import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Slide, SlideState } from "../../../utils/interfaces";
import { getById, list } from "./actions";

const initialState: SlideState = {
  records: [],
  totalPages: 0,
  filterData: {
    name: "",
    page: 1,
  },
  listState: {
    error: null,
    loading: false,
    success: false,
  },
  getState: {
    error: null,
    loading: false,
    success: false,
  },
  record: {} as Slide,
};

const slideSlice = createSlice({
  name: "slide",
  initialState,
  reducers: {
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.filterData.page = payload;
    },
    setName: (state, { payload }: PayloadAction<string>) => {
      state.filterData.name = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(list.pending, (state) => {
        state.listState.error = null;
        state.listState.loading = true;
        state.listState.success = false;
      })
      .addCase(list.fulfilled, (state, { payload }) => {
        state.records = payload.records;
        state.totalPages = payload.totalPages;
        state.listState.error = null;
        state.listState.loading = false;
        state.listState.success = true;
      })
      .addCase(list.rejected, (state, { payload }) => {
        state.listState.error = payload?.message as string;
        state.listState.loading = false;
        state.listState.success = false;
      });
    builder
      .addCase(getById.pending, (state) => {
        state.getState.error = null;
        state.getState.loading = true;
        state.getState.success = false;
      })
      .addCase(getById.fulfilled, (state, { payload }) => {
        state.record = payload;
        state.getState.error = null;
        state.getState.loading = false;
        state.getState.success = true;
      })
      .addCase(getById.rejected, (state, { payload }) => {
        state.getState.error = payload?.message as string;
        state.getState.loading = false;
        state.getState.success = false;
      });
  },
});

export const { setPage, setName } = slideSlice.actions;
const slideReducer = slideSlice.reducer;
export default slideReducer;
