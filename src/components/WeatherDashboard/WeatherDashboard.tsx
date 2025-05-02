// src/components/WeatherDashboard/WeatherDashboard.tsx

import "./WeatherDashboard.scss";

import type { JSX } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  DailyForecast,
  fetchCoordinates,
  fetchFiveDayForecast,
} from "../../api/weather";

export default function WeatherDashboard(): JSX.Element {
  const [city, setCity] = useState<string>("Taipei");
  const [list, setList] = useState<DailyForecast[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function load(): Promise<void> {
      try {
        setError("");
        const { lat, lon } = await fetchCoordinates(city);
        const data = await fetchFiveDayForecast(lat, lon);
        setList(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("發生未知錯誤");
        }
        setList([]);
      }
    }
    load();
  }, [city]);

  return (
    <section className="weather-dashboard">
      {/* 返回首頁 */}
      <Link to="/" className="back-home-link">
        ← 返回首頁
      </Link>

      <h2 className="weather-dashboard-title">天氣預報看板</h2>

      <div className="weather-dashboard-search">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="輸入城市，例如 Taipei"
        />
      </div>

      {error && <p className="weather-dashboard-error">{error}</p>}

      <div className="weather-dashboard-grid">
        {list.map((day) => (
          <article key={day.date} className="weather-dashboard-card">
            <time className="weather-dashboard-date">{day.date}</time>
            <p className="weather-dashboard-temp">
              最高：{Math.round(day.temp_max)}°C
              <br />
              最低：{Math.round(day.temp_min)}°C
            </p>
            <p className="weather-dashboard-code">
              天氣代碼：{day.weathercode}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
