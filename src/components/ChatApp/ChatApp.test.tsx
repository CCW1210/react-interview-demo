// src/components/ChatApp/ChatApp.test.tsx

import { render, screen, fireEvent, act } from "@testing-library/react";
import ChatApp from "./ChatApp";

class MockSocket {
  onopen: (() => void) | null = null;
  onmessage: ((e: { data: string }) => void) | null = null;
  readyState = 1;
  send = jest.fn();
  close = jest.fn();
  addEventListener(ev: string, cb: any) {
    if (ev === "message") this.onmessage = cb;
  }
  constructor() {
    setTimeout(() => this.onopen && this.onopen(), 0);
  }
}

describe("ChatApp", () => {
  beforeAll(() => {
    (window as any).WebSocket = MockSocket;
  });

  it("可以傳送並接收訊息", () => {
    render(<ChatApp />);
    const input = screen.getByPlaceholderText(/輸入訊息/);
    fireEvent.change(input, { target: { value: "Hello" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(screen.getByText("Hello")).toBeInTheDocument();

    const socket = (window as any).WebSocket.mock.instances[0] as MockSocket;
    act(() => {
      socket.onmessage!({ data: "Hello" });
    });
    const msgs = screen.getAllByText("Hello");
    expect(msgs.length).toBe(2);
  });
});
