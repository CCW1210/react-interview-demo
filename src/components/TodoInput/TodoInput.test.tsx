// src/components/TodoInput/TodoInput.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";

import TodoInput from "./TodoInput";

describe("TodoInput", () => {
  it("輸入文字並按下新增會觸發 onAdd", () => {
    const handleAdd = jest.fn();
    render(<TodoInput onAdd={handleAdd} />);

    // 改用與元件 placeholder 相符的文字
    const input = screen.getByPlaceholderText(/輸入待辦事項/);
    fireEvent.change(input, { target: { value: "寫作業" } });

    const button = screen.getByRole("button", { name: /新增/ });
    fireEvent.click(button);

    expect(handleAdd).toHaveBeenCalledWith("寫作業");
  });
});
