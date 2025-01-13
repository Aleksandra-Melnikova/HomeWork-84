import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "../store/slices/usersSlice.ts";
import { tasksReducer } from "../store/slices/tasksSlice.ts";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
