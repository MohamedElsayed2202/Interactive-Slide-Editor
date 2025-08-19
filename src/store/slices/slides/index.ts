import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  Background,
  Element,
  Slide,
  SlideState,
} from "../../../utils/interfaces";
import { addMedia, getById, getMedia, list } from "./actions";

const initialState: SlideState = {
  records: [],
  totalPages: 0,
  queryData: {
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
  type: "image",
  media: [],
  getMediaState: {
    error: null,
    loading: false,
    success: false,
  },
  currentElement: {} as Element,
  elements: [],
  typedText: "",
  addMediaState: {
    error: null,
    loading: false,
    success: false,
  },
  backgrounds: [],
};

const slideSlice = createSlice({
  name: "slide",
  initialState,
  reducers: {
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.queryData.page = payload;
    },
    setName: (state, { payload }: PayloadAction<string>) => {
      state.queryData.name = payload;
    },
    setType: (state, { payload }: PayloadAction<"text" | "image">) => {
      state.type = payload;
    },
    setNewElement: (state, { payload }: PayloadAction<Element>) => {
      state.elements.push(payload);
    },
    setNewBackground: (state, { payload }: PayloadAction<Background>) => {
      state.backgrounds.push(payload);
    },
    setCurrentElement: (state, { payload }: PayloadAction<Element>) => {
      state.currentElement = payload;
    },
    setTypedText: (state, { payload }: PayloadAction<string>) => {
      state.typedText = payload;
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
    builder
      .addCase(getMedia.pending, (state) => {
        state.getMediaState.error = null;
        state.getMediaState.loading = true;
        state.getMediaState.success = false;
      })
      .addCase(getMedia.fulfilled, (state, { payload }) => {
        state.media = payload;
        state.getMediaState.error = null;
        state.getMediaState.loading = false;
        state.getMediaState.success = true;
      })
      .addCase(getMedia.rejected, (state, { payload }) => {
        state.getMediaState.error = payload?.message as string;
        state.getMediaState.loading = false;
        state.getMediaState.success = false;
      });
    builder
      .addCase(addMedia.pending, (state) => {
        state.addMediaState.error = null;
        state.addMediaState.loading = true;
        state.addMediaState.success = false;
      })
      .addCase(addMedia.fulfilled, (state) => {
        state.addMediaState.error = null;
        state.addMediaState.loading = false;
        state.addMediaState.success = true;
      })
      .addCase(addMedia.rejected, (state, { payload }) => {
        state.addMediaState.error = payload?.message as string;
        state.addMediaState.loading = false;
        state.addMediaState.success = false;
      });
  },
});

export const {
  setPage,
  setName,
  setType,
  setCurrentElement,
  setNewElement,
  setTypedText,
  setNewBackground,
} = slideSlice.actions;
const slideReducer = slideSlice.reducer;
export default slideReducer;
