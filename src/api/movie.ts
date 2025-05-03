import axios from "axios";

// 定義?�們�??��?�?
export interface Movie {
  id: number;
  title: string;
  posterURL: string;
  releaseDate: string;
  description: string;
}

/**
 * ??Key ??SampleAPIs ?�本?��?�?
 * ?��?次�? action 類�??�電影�?下�?�?
 * ?�用 title ?��?端�?�?
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
