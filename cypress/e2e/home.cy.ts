// cypress/e2e/home.cy.ts
/// <reference types="cypress" />

describe("Home 頁面", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("應該顯示所有功能連結", () => {
    const texts = [
      "Todo List",
      "天氣預報看板",
      "電影搜尋",
      "收支管理",
      "即時聊天室",
      "大宗商品即時報價"
    ];
    texts.forEach((t) => {
      cy.contains(t).should("be.visible");
    });
  });

  it("點擊後能正確導航到對應路由", () => {
    cy.contains("Todo List").click();
    cy.url().should("include", "/todoList");
    cy.go("back");

    cy.contains("天氣預報看板").click();
    cy.url().should("include", "/weatherDashboard");
    cy.go("back");

    cy.contains("電影搜尋").click();
    cy.url().should("include", "/movieSearch");
    cy.go("back");

    cy.contains("收支管理").click();
    cy.url().should("include", "/expenseTracker");
    cy.go("back");

    cy.contains("即時聊天室").click();
    cy.url().should("include", "/chatApp");
    cy.go("back");
    
    cy.contains("大宗商品即時報價").click();
    cy.url().should("include", "/commodityMonitor");
  });
});
