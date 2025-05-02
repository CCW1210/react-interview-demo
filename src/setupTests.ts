// src/setupTests.ts
import "@testing-library/jest-dom";

import {
  TextDecoder as NodeTextDecoder,
  TextEncoder as NodeTextEncoder,
} from "util";

// Polyfill TextEncoder/TextDecoder（Node.js 環境）
if (typeof (global as any).TextEncoder === "undefined") {
  (global as any).TextEncoder = NodeTextEncoder;
}
if (typeof (global as any).TextDecoder === "undefined") {
  (global as any).TextDecoder = NodeTextDecoder;
}

// Polyfill scrollIntoView（JSDOM 不實作）
window.HTMLElement.prototype.scrollIntoView = function (): void {
  // no-op
};

// 完整 mock 全域 WebSocket，符合標準介面
class MockWebSocket {
  static CONNECTING = 0;

  static OPEN = 1;

  static CLOSING = 2;

  static CLOSED = 3;

  readyState = MockWebSocket.OPEN;

  onopen: () => void = () => {};

  onmessage: (event: MessageEvent) => void = () => {};

  onclose: () => void = () => {};

  onerror: () => void = () => {};

  constructor(_url: string | URL, _protocols?: string | string[]) {
    // no-op
  }

  send(_data: string): void {
    // no-op
  }

  close(): void {
    // no-op
  }

  addEventListener(
    _type: string,
    _listener: EventListenerOrEventListenerObject
  ): void {
    // no-op
  }

  removeEventListener(
    _type: string,
    _listener: EventListenerOrEventListenerObject
  ): void {
    // no-op
  }

  addListener(_event: string, _cb: () => void): void {
    // no-op
  }

  removeListener(_event: string, _cb: () => void): void {
    // no-op
  }
}

// 經過 unknown 再轉回 typeof WebSocket，避開 TS 類型衝突
(global as any).WebSocket = MockWebSocket as unknown as typeof WebSocket;
