import { fireEvent, render, screen } from "@testing-library/react";

import TodoInput from "./TodoInput";

describe("TodoInput", () => {
  it("輸入內容並按下新增會觸發 onAdd", () => {
    const handleAdd = jest.fn();
    render(<TodoInput onAdd={handleAdd} />);

    // 使用模糊的placeholder文本匹配
    const input = screen.getByPlaceholderText(/輸入待辦事項/);
    fireEvent.change(input, { target: { value: "寫測試" } });

    const button = screen.getByRole("button", { name: /新增/ });
    fireEvent.click(button);

    expect(handleAdd).toHaveBeenCalledWith("寫測試");
  });
});
