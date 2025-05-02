describe("ChatApp E2E", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains('a[data-discover="true"]', "即時聊天室").click();
  });

  it("可以傳送並顯示自己的訊息", () => {
    cy.get("input.chat-app-input").type("Hello");
    cy.get("button.chat-app-send-button").click();
    cy.contains(".chat-app-message.chat-app-message-me", "Hello").should(
      "be.visible"
    );
  });
});
