import { configureStore } from "@reduxjs/toolkit";

import { saveItem } from "../api/storage";
import type { CommodityState } from "./commoditySlice";
import commodityReducer from "./commoditySlice";
import expenseReducer, { ExpenseState } from "./expenseSlice";
import movieReducer, { MovieState } from "./movieSlice";
import todoReducer, { TodoState } from "./todoSlice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    expenses: expenseReducer,
    todos: todoReducer,
    commodity: commodityReducer,
  },
});

store.subscribe(() => {
  const { expenses } = store.getState();
  saveItem("expenses", expenses.list);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type { CommodityState, ExpenseState, MovieState, TodoState };
