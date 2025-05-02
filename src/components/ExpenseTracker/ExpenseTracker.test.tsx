import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import expenseReducer from "../../store/expenseSlice";
import ExpenseTracker from "./ExpenseTracker";

describe("ExpenseTracker", () => {
  const store = configureStore({
    reducer: { expenses: expenseReducer },
  });

  it("能新增一筆支出並顯示", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ExpenseTracker />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("描述"), {
      target: { value: "午餐" },
    });
    fireEvent.change(screen.getByPlaceholderText("金額"), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByPlaceholderText("類別"), {
      target: { value: "食物" },
    });
    fireEvent.click(screen.getByRole("button", { name: "新增" }));

    expect(screen.getByText("午餐")).toBeInTheDocument();
    expect(screen.getByText("100 元")).toBeInTheDocument();
    expect(screen.getAllByText("食物")[0]).toBeInTheDocument();
  });
});
