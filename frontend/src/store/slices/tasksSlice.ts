import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store.ts";
import { ITask } from "../../types";
import { createTask, deleteTask, fetchTasks } from "../thunks/tasksThunk.ts";

interface TasksState {
  isFetchLoading: boolean;
  tasks: ITask[];
  isDeleteTaskLoading: boolean;
  isAddLoading: boolean;
}

const initialState: TasksState = {
  isFetchLoading: false,
  tasks: [],
  isDeleteTaskLoading: false,
  isAddLoading: false,
};
export const selectFetchLoading = (state: RootState) =>
  state.tasks.isFetchLoading;
export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectDeleteLoading = (state: RootState) =>
  state.tasks.isDeleteTaskLoading;
export const selectAddLoading = (state: RootState) => state.tasks.isAddLoading;

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.isAddLoading = true;
      })
      .addCase(createTask.fulfilled, (state) => {
        state.isAddLoading = false;
      })
      .addCase(createTask.rejected, (state) => {
        state.isAddLoading = false;
      })
      .addCase(fetchTasks.pending, (state) => {
        state.isFetchLoading = true;
      })
      .addCase(
        fetchTasks.fulfilled,
        (state, action: PayloadAction<ITask[]>) => {
          state.isFetchLoading = false;
          state.tasks = action.payload;
        },
      )
      .addCase(fetchTasks.rejected, (state) => {
        state.isFetchLoading = false;
      })
      .addCase(deleteTask.pending, (state) => {
        state.isDeleteTaskLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state) => {
        state.isDeleteTaskLoading = false;
      })
      .addCase(deleteTask.rejected, (state) => {
        state.isDeleteTaskLoading = false;
      });
  },
});

export const tasksReducer = tasksSlice.reducer;
