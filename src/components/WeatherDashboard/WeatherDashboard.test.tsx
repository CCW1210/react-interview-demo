import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import * as api from "../../api/weather";
import WeatherDashboard from "./WeatherDashboard";

jest.mock("../../api/weather", () => ({
  fetchCoordinates: jest.fn(),
  fetchFiveDayForecast: jest.fn(),
}));

describe("WeatherDashboard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("預設載入 Taipei 的五日預報", async () => {
    (api.fetchCoordinates as jest.Mock).mockResolvedValue({
      lat: 25,
      lon: 121,
    });
    (api.fetchFiveDayForecast as jest.Mock).mockResolvedValue([
      {
        dt: 1,
        temp: { max: 10, min: 5 },
        weather: [{ id: 800, main: "晴", description: "", icon: "" }],
      },
    ]);

    render(
      <MemoryRouter>
        <WeatherDashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(api.fetchCoordinates).toHaveBeenCalledWith("Taipei");
    });

    expect(await screen.findByText(/最高：10/)).toBeInTheDocument();
    expect(await screen.findByText(/最低：5/)).toBeInTheDocument();
  });

  it("輸入新城市後會更新", async () => {
    (api.fetchCoordinates as jest.Mock).mockResolvedValue({
      lat: 24,
      lon: 120,
    });
    (api.fetchFiveDayForecast as jest.Mock).mockResolvedValue([
      {
        dt: 1,
        temp: { max: 20, min: 15 },
        weather: [{ id: 801, main: "多雲", description: "", icon: "" }],
      },
    ]);

    render(
      <MemoryRouter>
        <WeatherDashboard />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/輸入城市/), {
      target: { value: "Kaohsiung" },
    });
    fireEvent.click(screen.getByRole("button", { name: /查詢/ }));

    await waitFor(() => {
      expect(api.fetchCoordinates).toHaveBeenCalledWith("Kaohsiung");
    });

    expect(await screen.findByText(/最高：20/)).toBeInTheDocument();
    expect(await screen.findByText(/最低：15/)).toBeInTheDocument();
    expect(await screen.findByText(/多雲/)).toBeInTheDocument();
  });

  it("查無此城市時顯示錯誤", async () => {
    (api.fetchCoordinates as jest.Mock).mockRejectedValue(
      new Error("查無此城市")
    );

    render(
      <MemoryRouter>
        <WeatherDashboard />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/輸入城市/), {
      target: { value: "UnknownCity" },
    });
    fireEvent.click(screen.getByRole("button", { name: /查詢/ }));

    expect(await screen.findByText(/查無此城市/)).toBeInTheDocument();
  });
});
