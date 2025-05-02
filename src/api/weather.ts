import axios from "axios";

export interface DailyForecast {
  dt: number;
  temp: {
    max: number;
    min: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
}

export async function fetchCoordinates(
  city: string
): Promise<{ lat: number; lon: number }> {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const res = await axios.get("https://api.openweathermap.org/geo/1.0/direct", {
    params: { q: city, limit: 1, appid: apiKey },
  });
  const [{ lat, lon }] = res.data;
  return { lat, lon };
}

export async function fetchFiveDayForecast(
  lat: number,
  lon: number
): Promise<DailyForecast[]> {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const res = await axios.get(
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
  return res.data.daily.slice(0, 5);
}
