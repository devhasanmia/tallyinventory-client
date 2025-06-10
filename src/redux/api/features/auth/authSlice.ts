import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
  userId: string;
  email: string;
  designation: string;
  iat: number;
  exp: number;
};

type TAuthState = {
  user: TUser | null;
  token: string | null;
  otpToken: string | null
};

const initialState: TAuthState = {
  user: null,
  token: null,
  otpToken: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    otpAuth: (state, action) => {
      const { otpAuthToken } = action.payload;
      state.otpToken = otpAuthToken;
    },
    setUser: (state, action) => {
      const { user, token } = action.payload;
      (state.user = user), (state.token = token);
    },
    logout: (state) => {
      (state.user = null), (state.token = null);
    },
  },
});

export const { setUser, logout, otpAuth } = authSlice.actions;
export default authSlice.reducer;
