import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import ChatApp from "./ChatApp";

describe("ChatApp", () => {
  let originalWebSocket: typeof global.WebSocket;

  beforeAll(() => {
    originalWebSocket = global.WebSocket;
  });

  afterAll(() => {
    global.WebSocket = originalWebSocket;
  });

  it("可以傳送並接收訊息", async () => {
    class MockWebSocket {
      static OPEN = 1;

      readyState = 1;

      onmessage: ((event: MessageEvent) => void) | null = null;

      constructor() {
        setTimeout(() => {
          if (this.onmessage) {
            this.onmessage({ data: "Hello" } as MessageEvent);
          }
        }, 10);
      }

      // eslint-disable-next-line class-methods-use-this
      send(): void {
        // 模擬訊息傳送，測試用
      }

      // eslint-disable-next-line class-methods-use-this
      close(): void {
        // 模擬關閉連線，測試用
      }

      addEventListener(
        event: string,
        callback: (e: MessageEvent) => void
      ): void {
        if (event === "message") {
          this.onmessage = callback;
        }
      }
    }

    global.WebSocket = MockWebSocket as unknown as typeof global.WebSocket;

    render(
      <MemoryRouter>
        <ChatApp />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/輸入訊息/);
    fireEvent.change(input, { target: { value: "Hello" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(await screen.findByText("Hello")).toBeInTheDocument();
  });
});
