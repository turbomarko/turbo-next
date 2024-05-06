import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  tokenExpirationTime: string | null;
};

const initialState = {
  tokenExpirationTime: null,
} as AuthState;

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokenExpirationTime: (state, action: PayloadAction<string | null>) => {
      state.tokenExpirationTime = action.payload;
    },
  },
});

export const {
  setTokenExpirationTime,
} = slice.actions;

export default slice.reducer;
