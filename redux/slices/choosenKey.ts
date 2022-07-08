import { createSlice } from "@reduxjs/toolkit";

// isEmpty: render ra trang trống
// isSetImage: bảng chọn hình
// isChooseImage: mở bảng chọn hình từ trang trống

const initialState = "";

export const choosenKey = createSlice({
  name: "choosenKey",
  initialState,
  reducers: {
    setChoosenKey: (state, action) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setChoosenKey } = choosenKey.actions;

export default choosenKey.reducer;
