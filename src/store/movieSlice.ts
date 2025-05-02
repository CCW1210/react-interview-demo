// src/store/movieSlice.ts

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";
import { searchMovies } from "../api/movie"; // 改為正確的命名匯入

// 定義 Movie 介面
export interface Movie {
  id: number;
  title: string;
  posterURL: string;
  releaseDate: string;
  description: string;
}

// 匯出 state 型別
export interface MovieState {
  query: string;
  results: Movie[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MovieState = {
  query: "",
  results: [],
  status: "idle",
  error: null,
};

// 異步 thunk 的型別設定
interface AsyncThunkConfig {
  state: RootState;
  rejectValue: string;
}

// 建立異步 action：呼叫 searchMovies
export const getMovies = createAsyncThunk<Movie[], string, AsyncThunkConfig>(
  "movies/fetchMovies",
  async (query, thunkAPI) => {
    try {
      const movies = await searchMovies(query);
      return movies;
    } catch (err) {
      return thunkAPI.rejectWithValue((err as Error).message);
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    clearMovies(state) {
      state.results = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to fetch movies";
      });
  },
});

// 匯出同步 actions
export const { setQuery, clearMovies } = movieSlice.actions;

// 匯出 reducer
export default movieSlice.reducer;
