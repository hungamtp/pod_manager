import { Blueprint } from "@/models/blueprint";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Blueprint = {
  blueprintId: "",
  key: "",
  isEdit: false,
  width: 14,
  height: 14,
  position: "",
  widthRate: 20,
  heightRate: 20,
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
      console.log(action.payload, "payload");
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
    resetDesigns: () => {
      console.log("xin m dayy");
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
} = designSlice.actions;

export default designSlice.reducer;
