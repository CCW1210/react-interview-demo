// 在 window 還沒 load 前先把全域 WebSocket 換成 mock
Cypress.on("window:before:load", (win) => {
  class MockWebSocket {
    static OPEN = 1;
    readyState = MockWebSocket.OPEN;
    onopen: (() => void) | null = null;
    onmessage: ((e: MessageEvent) => void) | null = null;

    constructor(_url: string, _protocols?: string | string[]) {
      // 模擬立即 open
      setTimeout(() => this.onopen?.(), 0);
    }

    send(data: string) {
      // echo
      setTimeout(() => this.onmessage?.({ data } as any), 0);
    }
    close() {}
    addEventListener(type: string, cb: any) {
      if (type === "message") this.onmessage = cb;
      if (type === "open") this.onopen = cb;
    }
    removeEventListener() {}
  }

  win.WebSocket = MockWebSocket as any;
});
