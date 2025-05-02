import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import type { DailyForecast } from "../../api/weather";
import { fetchCoordinates, fetchFiveDayForecast } from "../../api/weather";

export default function WeatherDashboard() {
  const defaultCity = "Taipei";
  const [city, setCity] = useState(defaultCity);
  const [list, setList] = useState<DailyForecast[]>([]);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const { lat, lon } = await fetchCoordinates(city);
      const data = await fetchFiveDayForecast(lat, lon);
      setList(data);
      setError("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("發生未知錯誤");
      }
      setList([]);
    }
  }, [city]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <section className="weather-dashboard">
      <Link to="/" className="back-home-link" data-discover="true">
        ← 返回首頁
      </Link>
      <h2 className="weather-dashboard-title">天氣預報看板</h2>
      <div className="weather-dashboard-search">
        <input
          type="text"
          placeholder="輸入城市，例如 Taipei"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          type="button"
          className="weather-dashboard-button"
          onClick={load}
        >
          查詢
        </button>
      </div>
      <div className="weather-dashboard-grid">
        {error ? (
          <p>{error}</p>
        ) : (
          list.map((item) => (
            <article key={item.dt} className="weather-dashboard-card">
              <time className="weather-dashboard-date">
                {new Date(item.dt * 1000).toLocaleDateString(undefined, {
                  month: "numeric",
                  day: "numeric",
                })}
              </time>
              <p className="weather-dashboard-temp">
                最高：{Math.round(item.temp.max)}°C
                <br />
                最低：{Math.round(item.temp.min)}°C
              </p>
              <p className="weather-dashboard-desc">{item.weather[0].main}</p>
              <p className="weather-dashboard-code">
                天氣代碼：{item.weather[0].id}
              </p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
