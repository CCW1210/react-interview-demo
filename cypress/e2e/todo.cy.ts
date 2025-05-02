// cypress/e2e/todo.cy.ts
describe("Todo List 功能測試", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains('a[data-discover="true"]', "Todo List清單管理器").click();
  });

  it("可以新增一筆 todo，並完成、刪除它", () => {
    // 直接用剛剛加的 todo-input class
    cy.get("input.todo-input").type("寫作業");
    cy.contains("button", "新增").click();

    cy.contains(".todo-item", "寫作業").as("newItem").should("be.visible");

    cy.get("@newItem").find("input[type='checkbox']").check();

    cy.get("@newItem").should("have.class", "completed");

    cy.get("@newItem").contains("刪除").click();

    cy.get(".todo-item").should("not.exist");
  });
});
