import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthSlice } from "../../models/AuthSlice";
import { RootState } from "../store";

const initialState: AuthSlice = {
  modalOpen: false,
  username: localStorage.getItem("username") ?? "",
  token:localStorage.getItem("token") ?? ""
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    updateModal: (state, action: PayloadAction<boolean>) => {
      state.modalOpen= action.payload 
    },
    setCredentials: (state,{payload: { username, token }}: PayloadAction<{ username: string; token: string }>,
    ) => {
      state.username = username
      state.token = token
      state.modalOpen = true
      localStorage.setItem("jwt-token",token)
      localStorage.setItem("username",username)
    },
    doLogout: (state) => {
      state.username = ""
      state.token = ""
      state.modalOpen = true
      localStorage.setItem("jwt-token","")
      localStorage.setItem("username","")
    },
  },
});

export const { updateModal, doLogout,setCredentials } = authSlice.actions;
export const selectCurrentUser = (state: RootState) => state.auth.username
export const modalOpen = (state: RootState) => state.auth.modalOpen

export default authSlice.reducer;
