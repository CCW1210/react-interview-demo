/* eslint-disable no-param-reassign */
// src/store/expenseSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { loadItem } from "../api/storage";

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string; // ISO
}

interface ExpenseState {
  list: Expense[];
  filterCategory: string;
}

const initialState: ExpenseState = {
  list: loadItem<Expense[]>("expenses") ?? [],
  filterCategory: "all",
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense(state, action: PayloadAction<Omit<Expense, "id">>) {
      const newExpense: Expense = {
        id: Date.now().toString(),
        ...action.payload,
      };
      state.list.push(newExpense);
    },
    removeExpense(state, action: PayloadAction<string>) {
      state.list = state.list.filter((exp) => exp.id !== action.payload);
    },
    setFilterCategory(state, action: PayloadAction<string>) {
      state.filterCategory = action.payload;
    },
  },
});

export const { addExpense, removeExpense, setFilterCategory } =
  expenseSlice.actions;
export default expenseSlice.reducer;
