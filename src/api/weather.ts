// src/api/weather.ts

import axios from "axios";

const { VITE_OWM_API_KEY: apiKey } = import.meta.env;

/** 取得城市經緯度 */
export async function fetchCoordinates(
  city: string
): Promise<{ lat: number; lon: number; name: string }> {
  const response = await axios.get(
    "https://api.openweathermap.org/geo/1.0/direct",
    {
      params: { q: city, limit: 1, appid: apiKey },
    }
  );
  const data = response.data[0];

  if (!data) {
    throw new Error("查無此城市");
  }

  return { lat: data.lat, lon: data.lon, name: data.name };
}

/** 單日天氣資料型別 */
export interface DailyForecast {
  dt: number;
  temp: { day: number };
  weather: { icon: string; description: string }[];
}

/** 取得五天預報 */
export async function fetchFiveDayForecast(
  lat: number,
  lon: number
): Promise<DailyForecast[]> {
  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/onecall",
    {
      params: {
        lat,
        lon,
        exclude: "current,minutely,hourly,alerts",
        units: "metric",
        appid: apiKey,
      },
    }
  );

  return response.data.daily.slice(0, 5);
}
