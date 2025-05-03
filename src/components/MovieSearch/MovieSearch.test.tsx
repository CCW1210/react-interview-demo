import { fireEvent, render, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import { getMovies, setQuery } from "../../store/movieSlice";
import MovieSearch from "./MovieSearch";

// Mock react-redux hooks
jest.mock("react-redux", () => {
  const actual = jest.requireActual("react-redux");
  return {
    ...actual,
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  };
});

// Spy on action creators
jest.mock("../../store/movieSlice", () => ({
  setQuery: jest.fn((q: string) => ({ type: "movies/setQuery", payload: q })),
  getMovies: jest.fn((q: string) => ({ type: "movies/getMovies", payload: q })),
}));

describe("MovieSearch", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    // 將斷言為unknown，再轉為 jest.Mock
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as jest.Mock).mockReturnValue({
      query: "",
      results: [],
      status: "idle",
      error: null,
    });
    jest.clearAllMocks();
  });

  it("輸入關鍵字並點擊「搜尋」會調用 setQuery 和 getMovies", () => {
    render(
      <MemoryRouter>
        <MovieSearch />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/輸入電影關鍵字/);
    fireEvent.change(input, { target: { value: "Inception" } });

    const btn = screen.getByRole("button", { name: /搜尋/ });
    fireEvent.click(btn);

    expect(mockDispatch).toHaveBeenCalledWith(setQuery("Inception"));
    expect(mockDispatch).toHaveBeenCalledWith(getMovies("Inception"));
  });
});
