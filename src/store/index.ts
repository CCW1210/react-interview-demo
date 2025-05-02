// src/store/index.ts

import { configureStore } from "@reduxjs/toolkit";

import { saveItem } from "../api/storage";
import expenseReducer from "./expenseSlice";
import movieReducer from "./movieSlice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    expenses: expenseReducer,
  },
});

store.subscribe(() => {
  const { expenses } = store.getState();
  saveItem("expenses", expenses.list);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
