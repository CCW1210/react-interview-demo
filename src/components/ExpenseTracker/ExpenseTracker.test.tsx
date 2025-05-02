import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "../../store/expenseSlice";
import ExpenseTracker from "./ExpenseTracker";

function renderWithProviders() {
  const store = configureStore({ reducer: { expenses: expenseReducer } });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ExpenseTracker />
      </MemoryRouter>
    </Provider>
  );
}

describe("ExpenseTracker", () => {
  it("能新增、篩選及刪除支出", () => {
    renderWithProviders();

    // 新增一筆
    fireEvent.change(screen.getByPlaceholderText(/描述/), {
      target: { value: "Lunch" },
    });
    fireEvent.change(screen.getByPlaceholderText(/金額/), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByPlaceholderText(/類別/), {
      target: { value: "Food" },
    });
    fireEvent.click(screen.getByRole("button", { name: /新增/ }));

    expect(screen.getByText("Lunch")).toBeInTheDocument();
    expect(screen.getByText("100 元")).toBeInTheDocument();

    // 篩選
    fireEvent.change(screen.getByLabelText(/篩選類別/), {
      target: { value: "Food" },
    });
    expect(screen.getByText(/合計：100 元/)).toBeInTheDocument();

    // 刪除
    fireEvent.click(screen.getByRole("button", { name: /刪除/ }));
    expect(screen.queryByText("Lunch")).toBeNull();
  });
});
