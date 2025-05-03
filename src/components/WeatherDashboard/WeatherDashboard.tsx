import "./WeatherDashboard.scss";

import { useCallback, useEffect, useState } from "react";

import type { DailyForecast } from "../../api/weather";
import { fetchCoordinates, fetchFiveDayForecast } from "../../api/weather";

const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString("zh-TW", {
    month: "long",
    day: "numeric",
    weekday: "long",
  });
};

const getWeatherIcon = (code: string) => {
  const iconMap: { [key: string]: string } = {
    "01d": "☀️",
    "01n": "🌙",
    "02d": "⛅",
    "02n": "☁️",
    "03d": "☁️",
    "03n": "☁️",
    "04d": "☁️",
    "04n": "☁️",
    "09d": "🌧️",
    "09n": "🌧️",
    "10d": "🌦️",
    "10n": "🌧️",
    "11d": "⛈️",
    "11n": "⛈️",
    "13d": "🌨️",
    "13n": "🌨️",
    "50d": "🌫️",
    "50n": "🌫️",
  };
  return iconMap[code] || "❓";
};

export default function WeatherDashboard() {
  const defaultCity = "Kaohsiung";
  const [city, setCity] = useState(defaultCity);
  const [list, setList] = useState<DailyForecast[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!city.trim()) {
      setError("請輸入城市名稱");
      return;
    }

    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }, [city]);

  useEffect(() => {
    load();
  }, [load]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      load();
    }
  };

  return (
    <section className="weather-dashboard">
      <div className="weather-content">
        <h2 className="weather-dashboard-title">天氣預報看板</h2>
        <div className="weather-dashboard-search">
          <input
            type="text"
            placeholder="輸入城市名稱，例如：Kaohsiung"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            aria-label="城市名稱"
          />
          <button
            type="button"
            onClick={load}
            disabled={loading}
            aria-label={loading ? "查詢中" : "查詢天氣"}
          >
            {loading ? "查詢中..." : "查詢"}
          </button>
        </div>

        <div className="weather-dashboard-result">
          {(() => {
            if (error) {
              return (
                <div className="weather-error" role="alert">
                  <span className="error-icon">⚠️</span>
                  <p>{error}</p>
                </div>
              );
            }

            if (loading) {
              return (
                <div className="weather-loading" role="status">
                  <p>正在獲取天氣資訊...</p>
                </div>
              );
            }

            return (
              <div className="weather-dashboard-grid">
                {list.map((item) => (
                  <article key={item.dt} className="weather-dashboard-card">
                    <time
                      className="weather-dashboard-date"
                      dateTime={new Date(item.dt * 1000).toISOString()}
                    >
                      {formatDate(item.dt)}
                    </time>
                    <div className="weather-icon">
                      {getWeatherIcon(item.weather[0].icon)}
                    </div>
                    <p className="weather-dashboard-temp">
                      最高：{Math.round(item.temp.max)}°C
                      <br />
                      最低：{Math.round(item.temp.min)}°C
                    </p>
                    <p className="weather-dashboard-desc">
                      {item.weather[0].description}
                    </p>
                  </article>
                ))}
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
