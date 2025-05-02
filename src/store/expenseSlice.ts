import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 一筆支出的資料結構
export interface ExpenseItem {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

// Slice 的 State 型別
export interface ExpenseState {
  list: ExpenseItem[];
  filterCategory: string;
}

// 初始狀態
const initialState: ExpenseState = {
  list: [],
  filterCategory: "all",
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense(state, action: PayloadAction<Omit<ExpenseItem, "id">>) {
      state.list.push({
        id: Date.now().toString(),
        ...action.payload,
      });
    },
    removeExpense(state, action: PayloadAction<string>) {
      state.list = state.list.filter((exp) => exp.id !== action.payload);
    },
    clearExpenses(state) {
      state.list = [];
    },
    setFilterCategory(state, action: PayloadAction<string>) {
      state.filterCategory = action.payload;
    },
  },
});

export const { addExpense, removeExpense, clearExpenses, setFilterCategory } =
  expenseSlice.actions;

export default expenseSlice.reducer;
