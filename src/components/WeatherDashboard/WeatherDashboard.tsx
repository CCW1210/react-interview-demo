import React, { useState, useEffect } from "react";
import { fetchCoordinates, fetchFiveDayForecast } from "../../api/weather";
import { Link } from "react-router-dom";
import "./WeatherDashboard.scss";

interface ForecastDay {
  dt: number;
  temp_max: number;
  temp_min: number;
  weather: { id: number; description: string }[];
}

const WeatherDashboard: React.FC = () => {
  // 預設自動載入城市改為高雄
  const [city, setCity] = useState<string>("Kaohsiung");
  const [list, setList] = useState<ForecastDay[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 將 Raw API 回傳的資料轉換為 ForecastDay
  const load = async () => {
    try {
      const { lat, lon } = await fetchCoordinates(city);
      // 強制轉型為 any[]，以繞過 DailyForecast 型別不匹配
      const raw = (await fetchFiveDayForecast(lat, lon)) as any[];
      const data: ForecastDay[] = raw.map((day) => ({
        dt: day.dt,
        temp_max: day.temp.max,
        temp_min: day.temp.min,
        weather: day.weather,
      }));
      setList(data);
      setError(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "發生未知錯誤";
      setError(message);
      setList([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="weather-dashboard">
      <Link to="/" className="back-home-link">
        ← 返回首頁
      </Link>
      <h2 className="weather-dashboard-title">天氣預報看板</h2>
      <div className="weather-dashboard-search">
        <input
          placeholder="輸入城市，例如 Kaohsiung"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          type="button"
          onClick={load}
          className="weather-dashboard-button"
        >
          查詢
        </button>
      </div>
      {error && <div className="weather-dashboard-error">{error}</div>}
      <div className="weather-dashboard-grid">
        {list.map((day) => (
          <article key={day.dt} className="weather-dashboard-card">
            <time className="weather-dashboard-date">
              {new Date(day.dt * 1000).toLocaleDateString("zh-TW", {
                month: "numeric",
                day: "numeric",
              })}
            </time>
            <p className="weather-dashboard-temp">
              最高：{Math.round(day.temp_max)}°C
              <br />
              最低：{Math.round(day.temp_min)}°C
            </p>
            <p className="weather-dashboard-desc">
              {day.weather[0].description}
            </p>
            <p className="weather-dashboard-code">
              天氣代碼：{day.weather[0].id}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WeatherDashboard;
