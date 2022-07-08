import { createSlice } from "@reduxjs/toolkit";

// isEmpty: render ra trang trống
// isSetImage: bảng chọn hình
// isChooseImage: mở bảng chọn hình từ trang trống
export interface Preview {
  position: string;
  imageSrc: string;
  color: string;
}

const initialState: Preview[] = [];

export const previews = createSlice({
  name: "previews",
  initialState,
  reducers: {
    addPreview: (state, action) => {
      return [...state, action.payload];
    },
    clearAllPreview: () => {
      return [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addPreview, clearAllPreview } = previews.actions;

export default previews.reducer;
