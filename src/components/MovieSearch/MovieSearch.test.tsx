import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import movieReducer, { fetchMovies } from "../../store/movieSlice";
import MovieSearch from "./MovieSearch";

describe("MovieSearch", () => {
  it("輸入關鍵字並點擊「搜尋」會呼叫 fetchMovies", () => {
    // 1. 建立 store
    const store = configureStore({ reducer: { movies: movieReducer } });
    // 2. spy on dispatch
    jest.spyOn(store, "dispatch");

    // 3. render
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MovieSearch />
        </MemoryRouter>
      </Provider>
    );

    // 4. 輸入並搜尋
    const input = screen.getByPlaceholderText("輸入關鍵字…");
    fireEvent.change(input, { target: { value: "Inception" } });
    fireEvent.click(screen.getByRole("button", { name: "搜尋" }));

    // 5. 斷言 dispatch
    expect(store.dispatch).toHaveBeenCalledWith(fetchMovies("Inception"));
  });
});
