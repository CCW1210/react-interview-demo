/* eslint-disable no-param-reassign */
// src/store/movieSlice.ts

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Movie, searchMovies } from "../api/movie";

interface MovieState {
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

export const fetchMovies = createAsyncThunk<Movie[], string>(
  "movies/fetchMovies",
  async (query) => {
    const data = await searchMovies(query);
    return data;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "載入失敗";
      });
  },
});

export const { setQuery } = movieSlice.actions;
export default movieSlice.reducer;
