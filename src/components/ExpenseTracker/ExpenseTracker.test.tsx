// src/components/ExpenseTracker/ExpenseTracker.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "../../store/expenseSlice";
import ExpenseTracker from "./ExpenseTracker";

function renderWithStore() {
  const store = configureStore({ reducer: { expenses: expenseReducer } });
  render(
    <Provider store={store}>
      <ExpenseTracker />
    </Provider>
  );
}

describe("ExpenseTracker", () => {
  it("能新增、篩選及刪除支出", () => {
    renderWithStore();

    fireEvent.change(screen.getByPlaceholderText("描述"), {
      target: { value: "午餐" },
    });
    fireEvent.change(screen.getByPlaceholderText("金額"), {
      target: { value: "200" },
    });
    fireEvent.change(screen.getByPlaceholderText("類別"), {
      target: { value: "餐飲" },
    });
    fireEvent.click(screen.getByText("新增"));
    expect(screen.getByText("午餐")).toBeInTheDocument();
    expect(screen.getByText("200 元")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("篩選類別："), {
      target: { value: "餐飲" },
    });
    expect(screen.getByText("午餐")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("描述"), {
      target: { value: "捷運" },
    });
    fireEvent.change(screen.getByPlaceholderText("金額"), {
      target: { value: "50" },
    });
    fireEvent.change(screen.getByPlaceholderText("類別"), {
      target: { value: "交通" },
    });
    fireEvent.click(screen.getByText("新增"));
    expect(screen.queryByText("捷運")).not.toBeInTheDocument();

    fireEvent.click(screen.getAllByText("刪除")[0]);
    expect(screen.queryByText("午餐")).not.toBeInTheDocument();
  });
});
