/// <reference types="cypress" />
import { Server } from "mock-socket";

describe("ChatApp E2E", () => {
  it("可以傳送並接收訊息", () => {
    // 建立 mock WebSocket server
    const mockServer = new Server("ws://localhost:4000");

    // 當 client 連線時
    mockServer.on("connection", (socket: any) => {
      // 觸發 client 端的 onopen
      socket.onopen && socket.onopen();
      // 當 client 發送訊息就 echo 回去
      socket.onmessage = (event: any) => {
        socket.send(JSON.stringify({ id: "srv-1", text: event.data }));
      };
    });

    // 造訪你的應用程式首頁（請確保 ChatApp 綁在 /chatApp 或 / 路由下）
    cy.visit("/chatApp");

    // 找到輸入框，打字並按 Enter 送出
    cy.get("input[placeholder='輸入訊息…']").type("Hello{enter}");

    // 斷言畫面上同時看到 client 發出的訊息和 server 回的訊息
    cy.contains("Hello").should("have.length.at.least", 2);
  });
});
