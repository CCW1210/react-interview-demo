// src/components/TodoInput/TodoInput.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import TodoInput from "./TodoInput";

describe("TodoInput", () => {
  it("輸入文字後按「新增」會呼叫 onAdd", () => {
    const onAdd = jest.fn();
    render(<TodoInput onAdd={onAdd} />);
    const input = screen.getByPlaceholderText("輸入待辦事項");
    fireEvent.change(input, { target: { value: "測試內容" } });
    fireEvent.click(screen.getByRole("button", { name: "新增" }));
    expect(onAdd).toHaveBeenCalledWith("測試內容");
  });
});
