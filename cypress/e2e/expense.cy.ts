// cypress/e2e/expense.cy.ts
/// <reference types="cypress" />

describe("ExpenseTracker 功能測試", () => {
  beforeEach(() => {
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
});
