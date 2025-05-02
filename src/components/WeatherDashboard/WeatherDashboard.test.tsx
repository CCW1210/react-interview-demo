// src/components/WeatherDashboard/WeatherDashboard.test.tsx

import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import WeatherDashboard from "./WeatherDashboard";
import * as api from "../../api/weather";

jest.mock("../../api/weather");

describe("WeatherDashboard", () => {
  const mockedFetchCoordinates = api.fetchCoordinates as jest.Mock;
  const mockedFetchFiveDayForecast = api.fetchFiveDayForecast as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("預設載入 Taipei 的五日預報", async () => {
    mockedFetchCoordinates.mockResolvedValue({
      lat: 25,
      lon: 121,
      name: "Taipei",
    });
    mockedFetchFiveDayForecast.mockResolvedValue([
      { date: "2025-05-02", temp_max: 30, temp_min: 20, weathercode: 0 },
      { date: "2025-05-03", temp_max: 28, temp_min: 18, weathercode: 1 },
    ]);

    render(<WeatherDashboard />);
    await waitFor(() =>
      expect(mockedFetchCoordinates).toHaveBeenCalledWith("Taipei")
    );
    await waitFor(() =>
      expect(mockedFetchFiveDayForecast).toHaveBeenCalledWith(25, 121)
    );

    expect(screen.getByText("2025-05-02")).toBeInTheDocument();
    expect(screen.getByText(/最高：30/)).toBeInTheDocument();
    expect(screen.getByText(/最低：20/)).toBeInTheDocument();
  });

  it("輸入新城市後會更新", async () => {
    mockedFetchCoordinates.mockResolvedValue({
      lat: 10,
      lon: 10,
      name: "CityX",
    });
    mockedFetchFiveDayForecast.mockResolvedValue([
      { date: "2025-06-01", temp_max: 25, temp_min: 15, weathercode: 2 },
    ]);

    render(<WeatherDashboard />);
    const input = screen.getByPlaceholderText(/輸入城市/);
    fireEvent.change(input, { target: { value: "CityX" } });

    await waitFor(() =>
      expect(mockedFetchCoordinates).toHaveBeenCalledWith("CityX")
    );
    expect(screen.getByText("2025-06-01")).toBeInTheDocument();
  });

  it("查無此城市時顯示錯誤", async () => {
    mockedFetchCoordinates.mockRejectedValue(new Error("查無此城市"));
    render(<WeatherDashboard />);
    const input = screen.getByPlaceholderText(/輸入城市/);
    fireEvent.change(input, { target: { value: "Unknown" } });

    await waitFor(() =>
      expect(screen.getByText("查無此城市")).toBeInTheDocument()
    );
  });
});
