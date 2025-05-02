// src/components/WeatherDashboard/WeatherDashboard.tsx

import "./WeatherDashboard.scss";

import type { JSX } from "react";
import { useEffect, useState } from "react";

import {
  DailyForecast,
  fetchCoordinates,
  fetchFiveDayForecast,
} from "../../api/weather";

/**
 * 天氣預報看板元件
 */
export default function WeatherDashboard(): JSX.Element {
  const [city, setCity] = useState<string>("Taipei");
  const [forecastList, setForecastList] = useState<DailyForecast[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    async function loadForecast(): Promise<void> {
      try {
        setErrorMessage("");
        const { lat, lon } = await fetchCoordinates(city);
        const list = await fetchFiveDayForecast(lat, lon);
        setForecastList(list);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("發生未知錯誤");
        }
        setForecastList([]);
      }
    }

    loadForecast();
  }, [city]);

  return (
    <section className="weather-dashboard">
      <h2 className="weather-dashboard-title">天氣預報看板</h2>

      <div className="weather-dashboard-search">
        <input
          type="text"
          className="weather-dashboard-input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="輸入城市，例如 Taipei"
        />
      </div>

      {errorMessage && (
        <p className="weather-dashboard-error">{errorMessage}</p>
      )}

      <div className="weather-dashboard-grid">
        {forecastList.map((day) => {
          const dateString = new Date(day.dt * 1000).toLocaleDateString(
            "zh-TW",
            {
              weekday: "short",
              month: "numeric",
              day: "numeric",
            }
          );
          const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;

          return (
            <article key={day.dt} className="weather-dashboard-card">
              <time className="weather-dashboard-date">{dateString}</time>
              <img
                className="weather-dashboard-icon"
                src={iconUrl}
                alt={day.weather[0].description}
              />
              <p className="weather-dashboard-temp">
                {Math.round(day.temp.day)}°C
              </p>
              <p className="weather-dashboard-desc">
                {day.weather[0].description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
