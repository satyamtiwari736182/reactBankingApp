import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    hasWallet: false,
    token: ""
  },
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setHasWallet: (state, action) => {
      state.hasWallet = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setIsAuth, setHasWallet, setToken } = authSlice.actions;
export default authSlice.reducer;


