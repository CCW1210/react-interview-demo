import "./MovieSearch.scss";

import type { JSX } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { AppDispatch, RootState } from "../../store";
import type { Movie } from "../../store/movieSlice";
import { getMovies, setQuery } from "../../store/movieSlice";

export default function MovieSearch(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { query, results, status, error } = useSelector(
    (s: RootState) => s.movies
  );
  const [input, setInput] = useState<string>(query);

  // 當 query 更新時（例如一開始帶入或從 URL 進來）自動撈一次
  useEffect(() => {
    if (query) {
      dispatch(getMovies(query));
    }
  }, [dispatch, query]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch(setQuery(input));
  }

  return (
    <section className="movie-search">
      <Link className="back-home-link" to="/">
        ← 返回首頁
      </Link>
      <h2 className="movie-search-title">電影搜尋（SampleAPIs 版）</h2>
      <form className="movie-search-form" onSubmit={handleSubmit}>
        <input
          className="movie-search-input"
          placeholder="輸入電影關鍵字"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="movie-search-button" type="submit">
          搜尋
        </button>
      </form>
      <div className="movie-search-grid">
        {status === "loading" && <p>載入中...</p>}
        {status === "failed" && <p>錯誤：{error}</p>}
        {status === "succeeded" &&
          results.map((m: Movie) => (
            <article key={m.id} className="movie-search-card">
              <h3>{m.title}</h3>
              <p>{m.description}</p>
            </article>
          ))}
      </div>
    </section>
  );
}
