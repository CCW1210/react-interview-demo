// src/components/MovieSearch/MovieSearch.tsx

import "./MovieSearch.scss";

import type { JSX } from "react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import type { AppDispatch, RootState } from "../../store";
import { fetchMovies, setQuery } from "../../store/movieSlice";

export default function MovieSearch(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { query, results, status, error } = useSelector(
    (state: RootState) => state.movies
  );
  const [input, setInput] = useState<string>(query);

  useEffect(() => {
    if (query) {
      dispatch(fetchMovies(query));
    }
  }, [dispatch, query]);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(setQuery(input));
  }

  return (
    <section className="movie-search">
      <Link to="/" className="back-home-link">
        ← 返回首頁
      </Link>
      <h2 className="movie-search-title">電影搜尋（SampleAPIs 版）</h2>

      <form className="movie-search-form" onSubmit={handleSearch}>
        <input
          type="text"
          className="movie-search-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="輸入電影關鍵字"
        />
        <button type="submit" className="movie-search-button">
          搜尋
        </button>
      </form>

      {status === "loading" && <p>載入中…</p>}
      {status === "failed" && <p className="movie-search-error">{error}</p>}

      <div className="movie-search-grid">
        {results.map((movie) => (
          <article key={movie.id} className="movie-search-card">
            {movie.posterURL ? (
              <img
                className="movie-search-poster"
                src={movie.posterURL}
                alt={movie.title}
              />
            ) : (
              <div className="movie-search-no-poster">無海報</div>
            )}

            <h3 className="movie-search-name">{movie.title}</h3>
            <p className="movie-search-release">{movie.releaseDate}</p>
            <p className="movie-search-overview">{movie.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
