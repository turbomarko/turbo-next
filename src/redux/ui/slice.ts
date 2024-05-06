import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UiState = {
  isAuthModalOpen: boolean;
  nextRoute: string;
  isVerifyEmailModalOpen: boolean;
  isMenuOpen: boolean;
};

const initialState = {
  isAuthModalOpen: false,
  nextRoute: "",
  isVerifyEmailModalOpen: false,
  isMenuOpen: false,
} as UiState;

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openAuthModal: (state, action: PayloadAction<string>) => {
      state.isAuthModalOpen = true;
      state.nextRoute = action.payload;
    },
    closeAuthModal: (state) => {
      state.isAuthModalOpen = false;
    },
    openVerifyEmailModal: (state) => {
      state.isVerifyEmailModalOpen = true;
    },
    closeVerifyEmailModal: (state) => {
      state.isVerifyEmailModalOpen = false;
    },
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});

export const {
  openAuthModal,
  closeAuthModal,
  openVerifyEmailModal,
  closeVerifyEmailModal,
  toggleMenu,
} = slice.actions;

export default slice.reducer;
