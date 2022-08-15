import { Blueprint } from "@/models/blueprint";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Blueprint = {
  blueprintId: "",
  key: "",
  productName: "",
  isEdit: false,
  width: 14,
  height: 14,
  maxWidth: 19,
  maxHeight: 24,
  position: "",
  widthRate: 25,
  heightRate: 25,
  topRate: 1,
  src: "",
  tmpSrc: "",
};

export const designSlice = createSlice({
  name: "blueprint",
  initialState,
  reducers: {
    setValue: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // console.log(action.payload.choosenKey === placeHolder.key, 'chay nee');
      return {
        ...state,
        heightRate: action.payload.heightRate,
        topRate: action.payload.topRate,
        widthRate: action.payload.widthRate,
      };
    },

    setKey: (state, action) => {
      return {
        ...state,
        key: action.payload,
      };
    },

    setRealWidth: (state, action) => {
      return {
        ...state,
        width: action.payload,
      };
    },

    setRealHeight: (state, action) => {
      return {
        ...state,
        height: action.payload,
      };
    },
    setMaxWidth: (state, action) => {
      return {
        ...state,
        maxWidth: action.payload,
      };
    },
    setMaxHeight: (state, action) => {
      return {
        ...state,
        maxHeight: action.payload,
      };
    },

    loadBlueprint: (state, action) => {
      return action.payload;
    },

    updateImgSrc: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // console.log(action.payload.choosenKey === placeHolder.key, 'chay nee');
      return {
        ...state,
        tmpSrc: action.payload.tmpSrc,
        src: action.payload.src,
      };
    },
    setProductName: (state, action) => {
      return {
        ...state,
        productName: action.payload,
      };
    },
    resetDesigns: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setValue,
  setKey,
  resetDesigns,
  updateImgSrc,
  loadBlueprint,
  setRealWidth,
  setRealHeight,
  setProductName,
  setMaxWidth,
  setMaxHeight,
} = designSlice.actions;

export default designSlice.reducer;
