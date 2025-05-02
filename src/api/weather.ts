// src/api/weather.ts

import axios from "axios";

/** 取得城市經緯度（Open-Meteo 地理編碼） */
export async function fetchCoordinates(
  city: string
): Promise<{ lat: number; lon: number; name: string }> {
  const res = await axios.get(
    "https://geocoding-api.open-meteo.com/v1/search",
    { params: { name: city, count: 1 } }
  );
  if (!res.data.results || res.data.results.length === 0) {
    throw new Error("查無此城市");
  }
  const { latitude: lat, longitude: lon, name } = res.data.results[0];
  return { lat, lon, name };
}

/** 每日天氣資料型別 */
export interface DailyForecast {
  date: string;
  temp_max: number;
  temp_min: number;
  weathercode: number;
}

/** 取得未來五日預報（Open-Meteo One Call 免 Key） */
export async function fetchFiveDayForecast(
  lat: number,
  lon: number
): Promise<DailyForecast[]> {
  const res = await axios.get("https://api.open-meteo.com/v1/forecast", {
    params: {
      latitude: lat,
      longitude: lon,
      timezone: "Asia/Taipei",
      daily: "temperature_2m_max,temperature_2m_min,weathercode",
    },
  });
  const d = res.data.daily;
  // 只取前 5 筆
  return d.time.slice(0, 5).map((date: string, i: number) => ({
    date,
    temp_max: d.temperature_2m_max[i],
    temp_min: d.temperature_2m_min[i],
    weathercode: d.weathercode[i],
  }));
}
