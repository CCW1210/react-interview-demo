// src/store/movieSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Movie {
  id: string;
  title: string;
  description: string;
}

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

// 改成向本地 /movies endpoint 發，讓 Cypress intercept 能攔到
export const getMovies = createAsyncThunk<Movie[], string>(
  "movies/getMovies",
  async (q) => {
    const res = await axios.get("/movies", { params: { q } });
    return res.data as Movie[];
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
      .addCase(getMovies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getMovies.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.results = payload;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const { setQuery } = movieSlice.actions;
export default movieSlice.reducer;
