// src/components/Home/Home.test.tsx
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

    // 測試應改為符合 Home.tsx 中實際顯示的文字
    expect(screen.getByText("Todo List清單管理器")).toBeInTheDocument();
    expect(screen.getByText("天氣預報看板")).toBeInTheDocument();
    expect(screen.getByText("電影搜尋與收藏")).toBeInTheDocument();
    expect(screen.getByText("收支管理／金流紀錄")).toBeInTheDocument();
    expect(screen.getByText("即時聊天室")).toBeInTheDocument();
  });
});
