// src/test-utils/renderWithProviders.tsx
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import expenseReducer from "../store/expenseSlice";
import movieReducer from "../store/movieSlice";

const store = configureStore({
  reducer: {
    movies: movieReducer,
    expenses: expenseReducer,
  },
});

// 改用 default export 以符合 import/prefer-default-export
export default function renderWithProviders(ui: React.ReactElement) {
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
}
