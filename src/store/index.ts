import { configureStore } from "@reduxjs/toolkit";

import { saveItem } from "../api/storage";
import expenseReducer, { ExpenseState } from "./expenseSlice";
import movieReducer, { MovieState } from "./movieSlice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    expenses: expenseReducer,
  },
});

// 每次 state 變動就存一次 localStorage
store.subscribe(() => {
  const { expenses } = store.getState();
  saveItem("expenses", expenses.list);
});

// 標準的 RootState、AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 為了讓 .d.ts 可以正確找到這兩個 state 型別，特別匯出它們：
export type { ExpenseState, MovieState };
