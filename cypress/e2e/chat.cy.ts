describe("ChatApp E2E", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains('a[data-discover="true"]', "即時聊天室").click();
  });

  it("可以傳送並顯示自己的訊息", () => {
    const message = "Hello";
    cy.get("input.chat-app-input").type(message);
    cy.get("button.chat-app-send-button").click();
    cy.contains(".chat-app-message.chat-app-message-me", message).should(
      "be.visible"
    );
  });
  
  it("可以收到伺服器的回覆", () => {
    const message = "Echo test";
    cy.get("input.chat-app-input").type(message);
    cy.get("button.chat-app-send-button").click();
    
    // 檢查自己的訊息
    cy.contains(".chat-app-message.chat-app-message-me", message).should(
      "be.visible"
    );
    
    // 檢查伺服器的回覆 (由於我們使用mock websocket，回覆應該與發送訊息相同)
    cy.contains(".chat-app-message.chat-app-message-server", message).should(
      "be.visible"
    );
  });
  
  it("支持使用Enter發送訊息", () => {
    const message = "Enter key test";
    cy.get("input.chat-app-input").type(message).type("{enter}");
    
    cy.contains(".chat-app-message.chat-app-message-me", message).should(
      "be.visible"
    );
  });
});
