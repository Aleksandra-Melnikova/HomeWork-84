import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store.ts";
import { createNewUser, sessionUser } from "../thunks/usersThunk.ts";

interface CommentState {
  isAddUserLoading: boolean;
  isSessionLoading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  isAddUserLoading: false,
  isSessionLoading: false,
  error: null,
};

export const selectAddUserLoading = (state: RootState) =>
  state.users.isAddUserLoading;
export const selectSessionLoading = (state: RootState) =>
  state.users.isSessionLoading;
export const selectError = (state: RootState) => state.users.error;

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewUser.pending, (state) => {
        state.isAddUserLoading = true;
      })
      .addCase(createNewUser.fulfilled, (state) => {
        state.isAddUserLoading = false;
      })
      .addCase(createNewUser.rejected, (state) => {
        state.isAddUserLoading = false;
      })
      .addCase(sessionUser.pending, (state) => {
        state.isSessionLoading = true;
      })
      .addCase(sessionUser.fulfilled, (state, action) => {
        state.isSessionLoading = false;
        state.error = action.payload;
      })
      .addCase(sessionUser.rejected, (state) => {
        state.isSessionLoading = false;
      });
  },
});

export const usersReducer = usersSlice.reducer;
