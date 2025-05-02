// src/pages/TodoPage.test.tsx

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoPage from "./TodoPage";

beforeEach(() => {
  localStorage.clear();
});

test("可以新增、切換、刪除 Todo", async () => {
  render(<TodoPage />);
  const input = screen.getByPlaceholderText("新增待辦事項…");
  await userEvent.type(input, "E2E 測試");
  await userEvent.click(screen.getByRole("button", { name: "新增" }));
  expect(screen.getByText("E2E 測試")).toBeInTheDocument();

  const checkbox = screen.getByRole("checkbox");
  await userEvent.click(checkbox);
  expect(checkbox).toBeChecked();

  await userEvent.click(screen.getByRole("button", { name: "刪除" }));
  expect(screen.queryByText("E2E 測試")).not.toBeInTheDocument();
});
