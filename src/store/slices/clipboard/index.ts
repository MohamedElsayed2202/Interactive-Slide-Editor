import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ClipboardState, Element } from "../../../utils/interfaces";

const initialState: ClipboardState = {
  copiedElement: {} as Element,
};

const clipboardSlice = createSlice({
  name: "clipboard",
  initialState,
  reducers: {
    setCopiedElement: (state, { payload }: PayloadAction<Element>) => {
      state.copiedElement = payload;
    },
  },
});

export const {setCopiedElement} = clipboardSlice.actions;

const clipboardReducer = clipboardSlice.reducer;

export default clipboardReducer;
