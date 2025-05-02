import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

describe("Home", () => {
  it("應該渲染所有功能的連結", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // 用正則只要包含 Todo List 即可
    expect(screen.getByText(/Todo List/)).toBeInTheDocument();
    expect(screen.getByText(/天氣預報看板/)).toBeInTheDocument();
    expect(screen.getByText(/電影搜尋/)).toBeInTheDocument();
    expect(screen.getByText(/收支管理/)).toBeInTheDocument();
    expect(screen.getByText(/即時聊天室/)).toBeInTheDocument();
  });
});
