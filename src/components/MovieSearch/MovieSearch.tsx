import "./MovieSearch.scss";

import { JSX, useEffect, useState } from "react";
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

  // query 变了就发起请求
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

      {status === "loading" && <p>載入中…</p>}
      {status === "failed" && <p>錯誤：{error}</p>}
      {status === "succeeded" && (
        <ul className="movie-search-list">
          {results.map((m: Movie) => (
            <li key={m.id} className="movie-search-item">
              <h3>{m.title}</h3>
              <p>{m.description}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
