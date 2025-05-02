// src/api/movie.ts

import axios from "axios";

// 定義我們要的欄位
export interface Movie {
  id: number;
  title: string;
  posterURL: string;
  releaseDate: string;
  description: string;
}

/**
 * 免 Key 的 SampleAPIs 版本搜尋：
 * 先一次把 action 類型的電影拉下來，
 * 再用 title 做前端過濾
 */
export async function searchMovies(query: string): Promise<Movie[]> {
  const res = await axios.get<Movie[]>(
    "https://api.sampleapis.com/movies/action"
  );
  return res.data
    .filter((m) => m.title.toLowerCase().includes(query.trim().toLowerCase()))
    .map((m) => ({
      id: m.id,
      title: m.title,
      posterURL: m.posterURL,
      releaseDate: m.releaseDate,
      description: m.description,
    }));
}
