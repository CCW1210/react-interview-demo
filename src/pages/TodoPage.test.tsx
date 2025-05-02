import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TodoPage from "./TodoPage";

describe("TodoPage", () => {
  it("可以新增、切換、刪除 Todo", () => {
    render(
      <MemoryRouter>
        <TodoPage />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("輸入待辦事項");
    fireEvent.change(input, { target: { value: "E2E 測試" } });
    fireEvent.click(screen.getByRole("button", { name: "新增" }));
    expect(screen.getByText("E2E 測試")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("checkbox"));
    expect(screen.getByText("E2E 測試")).toHaveClass("done");

    fireEvent.click(screen.getByRole("button", { name: /刪除/ }));
    expect(screen.queryByText("E2E 測試")).toBeNull();
  });
});
