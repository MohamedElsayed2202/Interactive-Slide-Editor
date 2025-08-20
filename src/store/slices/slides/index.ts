import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  Background,
  Element,
  Position,
  Size,
  Slide,
  SlideState,
} from "../../../utils/interfaces";
import { addMedia, getById, getMedia, list, saveUpdates } from "./actions";

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
  currentElementId: "",
  elements: [],
  typedText: "",
  addMediaState: {
    error: null,
    loading: false,
    success: false,
  },
  backgrounds: [],
  isAdding: false,
  elementToBeAdded: {
    x_position: 0,
    y_position: 0,
    z_index: 100,
  },
  selectedImage: { id: undefined, path: "" },
  saveState: {
    error: null,
    loading: false,
    success: false,
  },
  openModal: false,
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
      const found = state.elements.findIndex((e) => e.id === payload.id);
      if (!found) return;
      state.elements.push(payload);
    },
    setNewBackground: (state, { payload }: PayloadAction<Background>) => {
      const filterd = state.backgrounds.filter(
        (b) => b.slideId !== payload.slideId
      );
      state.backgrounds = [...filterd, payload];
    },
    setCurrentElementId: (state, { payload }: PayloadAction<string>) => {
      state.currentElementId = payload;
    },
    setTypedText: (state, { payload }: PayloadAction<string>) => {
      state.typedText = payload;
    },
    setElementCordinates: (state, { payload }: PayloadAction<Position>) => {
      const index = state.elements.findIndex((e) => e.id === payload.id);
      if (index > -1) {
        state.elements[index].x_position = payload.x;
        state.elements[index].y_position = payload.y;
      }
    },
    setElementSize: (state, { payload }: PayloadAction<Size>) => {
      const index = state.elements.findIndex((e) => e.id === payload.id);
      if (index > -1) {
        state.elements[index].width = payload.width;
        state.elements[index].height = payload.height;
      }
    },
    setElementToBeAddedValues: (
      state,
      { payload }: PayloadAction<{ name: string; value: any }>
    ) => {
      const { name, value } = payload;
      state.elementToBeAdded = { ...state.elementToBeAdded, [name]: value };
    },
    setElementValues: (
      state,
      { payload }: PayloadAction<{ name: string; value: any }>
    ) => {
      const { name, value } = payload;
      const index = state.elements.findIndex(
        (e) => e.id === state.currentElementId
      );
      if (index > -1) {
        state.elements[index] = { ...state.elements[index], [name]: value };
      }
    },
    setIsAdding: (state, { payload }: PayloadAction<boolean>) => {
      state.isAdding = payload;
    },
    resetElementToBeAdded: (state) => {
      state.elementToBeAdded = {
        x_position: 0,
        y_position: 0,
        z_index: 100,
      };
    },
    deleteElement: (state, { payload }: PayloadAction<string>) => {
      const newElements = state.elements.filter((e) => e.id !== payload);
      state.elements = [...newElements];
    },
    setSelectedimage: (
      state,
      { payload }: PayloadAction<{ id: number | undefined; path: string }>
    ) => {
      state.selectedImage = payload;
    },
    setOpenModal: (state) => {
      state.openModal = !state.openModal;
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
    builder
      .addCase(saveUpdates.pending, (state) => {
        state.saveState.error = null;
        state.saveState.loading = true;
        state.saveState.success = false;
      })
      .addCase(saveUpdates.fulfilled, (state, { payload }) => {
        state.record = payload;
        state.saveState.error = null;
        state.saveState.loading = false;
        state.saveState.success = true;
      })
      .addCase(saveUpdates.rejected, (state, { payload }) => {
        state.saveState.error = payload?.message as string;
        state.saveState.loading = false;
        state.saveState.success = false;
      });
  },
});

export const {
  setPage,
  setName,
  setType,
  setCurrentElementId,
  setNewElement,
  setTypedText,
  setNewBackground,
  setElementCordinates,
  setElementSize,
  setElementToBeAddedValues,
  setIsAdding,
  resetElementToBeAdded,
  setElementValues,
  setSelectedimage,
  deleteElement,
  setOpenModal,
} = slideSlice.actions;
const slideReducer = slideSlice.reducer;
export default slideReducer;
