import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ChatApp from "./ChatApp";

describe("ChatApp", () => {
  it("可以傳送並接收訊息", () => {
    render(
      <MemoryRouter>
        <ChatApp />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/輸入訊息/);
    fireEvent.change(input, { target: { value: "Hello" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    // 預期訊息列表裡會出現兩次「Hello」
    const messages = screen.getAllByText("Hello");
    expect(messages.length).toBe(2);
  });
});
