// cypress/e2e/todo.cy.ts
/// <reference types="cypress" />

describe("Todo List 功能測試", () => {
  beforeEach(() => {
    cy.visit("/todoList");
    cy.get('input[placeholder="新增待辦事項…"]').as("input");
  });

  it("可以新增一筆 todo，並切換、刪除", () => {
    cy.get("@input").type("Cypress 測試");
    cy.contains("新增").click();
    cy.contains("Cypress 測試").should("exist");

    cy.get('input[type="checkbox"]').check().should("be.checked");
    cy.contains("刪除").click();
    cy.contains("Cypress 測試").should("not.exist");
  });
});
