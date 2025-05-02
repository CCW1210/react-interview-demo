// src/store/expenseSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 一筆支出的資料結構
export interface ExpenseItem {
  id: string;
  description: string;
  amount: number;
}

// Slice 的 State 型別，一定要匯出
export interface ExpenseState {
  list: ExpenseItem[];
}

// 初始狀態
const initialState: ExpenseState = {
  list: [],
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense(state, action: PayloadAction<ExpenseItem>) {
      state.list.push(action.payload);
    },
    removeExpense(state, action: PayloadAction<string>) {
      state.list = state.list.filter((exp) => exp.id !== action.payload);
    },
    clearExpenses(state) {
      state.list = [];
    },
  },
});

// 匯出 actions
export const { addExpense, removeExpense, clearExpenses } =
  expenseSlice.actions;

// 匯出 reducer
export default expenseSlice.reducer;
