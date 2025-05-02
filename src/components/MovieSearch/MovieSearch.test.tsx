// src/components/MovieSearch/MovieSearch.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import movieReducer, * as movieSlice from "../../store/movieSlice";
import MovieSearch from "./MovieSearch";

// 將 fetchMovies 轉成 jest.Mock
const mockFetchMovies = movieSlice.fetchMovies as unknown as jest.Mock;

// 在 module mock 之後，再套用
jest.mock("../../store/movieSlice", () => ({
  __esModule: true,
  ...jest.requireActual("../../store/movieSlice"),
  fetchMovies: jest.fn(),
}));

describe("MovieSearch", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({ reducer: { movies: movieReducer } });
    mockFetchMovies.mockClear();
  });

  it("輸入關鍵字並點擊「搜尋」會呼叫 fetchMovies", async () => {
    render(
      <Provider store={store}>
        <MovieSearch />
      </Provider>
    );

    const input = screen.getByPlaceholderText("輸入電影關鍵字");
    await userEvent.type(input, "Batman");
    fireEvent.click(screen.getByRole("button", { name: "搜尋" }));

    expect(mockFetchMovies).toHaveBeenCalledWith("Batman");
  });
});
