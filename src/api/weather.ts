import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org";

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface DailyForecast {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
}

export async function fetchCoordinates(city: string): Promise<Coordinates> {
  try {
    const response = await axios.get(
      `${BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
    );

    if (!response.data?.[0]) {
      throw new Error("找不到該城市");
    }

    return {
      lat: response.data[0].lat,
      lon: response.data[0].lon,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error("請在 .env 文件中設置有效的 VITE_OPENWEATHER_API_KEY");
    }
    throw error;
  }
}

export async function fetchFiveDayForecast(
  lat: number,
  lon: number
): Promise<DailyForecast[]> {
  try {
    const response = await axios.get(
      `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    // 將 3 小時間隔的數據轉換為每日數據
    const dailyData: { [key: string]: DailyForecast } = {};
    
    response.data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dailyData[date]) {
        dailyData[date] = {
          dt: item.dt,
          temp: {
            min: item.main.temp_min,
            max: item.main.temp_max
          },
          weather: [{
            id: item.weather[0].id,
            main: item.weather[0].main,
            description: item.weather[0].description,
            icon: item.weather[0].icon
          }]
        };
      } else {
        // 更新最高溫和最低溫
        dailyData[date].temp.min = Math.min(dailyData[date].temp.min, item.main.temp_min);
        dailyData[date].temp.max = Math.max(dailyData[date].temp.max, item.main.temp_max);
      }
    });

    return Object.values(dailyData).slice(0, 5);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error("請在 .env 文件中設置有效的 VITE_OPENWEATHER_API_KEY");
    }
    throw error;
  }
}
