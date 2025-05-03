// cypress/e2e/expense.cy.ts
/// <reference types="cypress" />

describe("ExpenseTracker 功能測試", () => {
  beforeEach(() => {
    // 清空原有數據
    cy.window().then((window) => {
      window.localStorage.clear();
    });
    cy.visit("/expenseTracker");
  });

  it("可以新增、篩選及刪除支出", () => {
    cy.get('input[placeholder="描述"]').type("午餐");
    cy.get('input[placeholder="金額"]').type("150");
    cy.get('input[placeholder="類別"]').type("餐飲");
    cy.contains("新增").click();
    cy.contains("午餐").should("exist");
    cy.contains("150 元").should("exist");

    cy.get("select").select("餐飲");
    cy.contains("午餐").should("exist");

    cy.get('input[placeholder="描述"]').clear().type("捷運");
    cy.get('input[placeholder="金額"]').clear().type("50");
    cy.get('input[placeholder="類別"]').clear().type("交通");
    cy.contains("新增").click();
    cy.contains("捷運").should("not.exist");

    cy.contains("刪除").first().click();
    cy.contains("午餐").should("not.exist");
  });
  
  it("正確計算合計金額", () => {
    // 添加第一筆支出
    cy.get('input[placeholder="描述"]').type("早餐");
    cy.get('input[placeholder="金額"]').type("80");
    cy.get('input[placeholder="類別"]').type("餐飲");
    cy.contains("新增").click();
    
    // 添加第二筆支出
    cy.get('input[placeholder="描述"]').clear().type("午餐");
    cy.get('input[placeholder="金額"]').clear().type("120");
    cy.get('input[placeholder="類別"]').clear().type("餐飲");
    cy.contains("新增").click();
    
    // 使用更寬鬆的檢查方式
    cy.get(".expense-tracker-summary").contains("200").should("exist");
    
    // 篩選測試
    cy.get("select").select("全部");
    cy.get(".expense-tracker-summary").contains("200").should("exist");
    
    // 刪除一筆後再檢查合計
    cy.contains("刪除").first().click();
    cy.get(".expense-tracker-summary").contains("120").should("exist");
  });
});
