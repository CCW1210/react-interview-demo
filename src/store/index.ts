// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";

import { saveItem } from "../api/storage";
import expenseReducer, { ExpenseState } from "./expenseSlice";
import movieReducer, { MovieState } from "./movieSlice";
import todoReducer, { TodoState } from "./todoSlice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    expenses: expenseReducer,
    todos: todoReducer,
  },
});

store.subscribe(() => {
  const { expenses } = store.getState();
  saveItem("expenses", expenses.list);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type { ExpenseState, MovieState, TodoState };
