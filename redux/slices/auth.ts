import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  isAuth: boolean;
  token: string;
  userId: string;
  roleName: string;
}

const initialState: CounterState = {
  isAuth: false,
  token: "",
  userId: "",
  roleName: "",
};

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isAuth = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.roleName = action.payload.roleName;
    },
    logout: (state) => {
      state.isAuth = false;
      state.token = "";
      state.userId = "";
      state.roleName = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = counterSlice.actions;

export default counterSlice.reducer;
