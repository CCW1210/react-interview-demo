import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import WeatherDashboard from "./WeatherDashboard";
import * as api from "../../api/weather";

jest.spyOn(api, "fetchFiveDayForecast").mockResolvedValue([
  { dt: 1, temp: { day: 10 }, weather: [{ icon: "01d", description: "晴" }] },
  // ...其他 4 天假資料
] as any);

jest.spyOn(api, "fetchCoordinates").mockResolvedValue({
  lat: 25,
  lon: 121,
  name: "Taipei",
});

describe("WeatherDashboard", () => {
  afterAll(() => jest.restoreAllMocks());

  it("預設載入 Taipei 的五日預報", async () => {
    render(
      <MemoryRouter>
        <WeatherDashboard />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(api.fetchCoordinates).toHaveBeenCalledWith("Taipei")
    );
    // 至少要看見某一天的溫度
    expect(await screen.findByText("10°C")).toBeInTheDocument();
  });

  it("輸入新城市後會更新", async () => {
    (api.fetchCoordinates as jest.Mock).mockResolvedValueOnce({
      lat: 0,
      lon: 0,
      name: "CityX",
    });
    render(
      <MemoryRouter>
        <WeatherDashboard />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/輸入城市/);
    fireEvent.change(input, { target: { value: "CityX" } });
    fireEvent.click(screen.getByRole("button", { name: /查詢/ }));

    await waitFor(() =>
      expect(api.fetchCoordinates).toHaveBeenCalledWith("CityX")
    );
  });

  it("查無此城市時顯示錯誤", async () => {
    (api.fetchCoordinates as jest.Mock).mockRejectedValueOnce(
      new Error("查無此城市")
    );
    render(
      <MemoryRouter>
        <WeatherDashboard />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/輸入城市/);
    fireEvent.change(input, { target: { value: "Unknown" } });
    fireEvent.click(screen.getByRole("button", { name: /查詢/ }));

    expect(await screen.findByText(/查無此城市/)).toBeInTheDocument();
  });
});
