describe("Todo List 功能測試", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains('a[data-discover="true"]', "Todo List清單管理器").click();
  });

  it("可以新增一筆 todo，並完成、刪除它", () => {
    cy.get("input[placeholder='輸入待辦事項']").type("寫作業");
    cy.contains("button", "新增").click();

    cy.contains(".todo-item", "寫作業").as("newItem").should("be.visible");

    // 勾選 checkbox
    cy.get("@newItem").find("input[type='checkbox']").check();

    // 項目的 <li> 加上 completed class
    cy.get("@newItem").should("have.class", "completed");

    // 刪除按鈕改用 aria-label 或 class 選取
    cy.get("@newItem").find("button.todo-item-delete-button").click();

    cy.get(".todo-item").should("not.exist");
  });
});
