describe("Todo List 功能測試", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains('a[data-discover="true"]', "Todo List清單管理器").click();
  });

  it("可以新增一筆 todo，並完成、刪除它", () => {
    cy.get("input[placeholder='輸入待辦事項']").type("寫作業");
    cy.contains("button", "新增").click();

    cy.contains(".todo-item", "寫作業").as("newItem").should("be.visible");

    // 使用force选项勾选checkbox
    cy.get("@newItem").find("input[type='checkbox']").check({force: true});

    // 項目的 <li> 加上 completed class
    cy.get("@newItem").should("have.class", "completed");

    // 刪除按鈕改用 aria-label 或 class 選取
    cy.get("@newItem").find("button.todo-item-delete-button").click();

    cy.get(".todo-item").should("not.exist");
  });
  
  it("重新整理後應該保留待辦事項", () => {
    // 新增待辦事項
    const todoText = "需要保存的待辦事項";
    cy.get("input[placeholder='輸入待辦事項']").type(todoText);
    cy.contains("button", "新增").click();
    
    // 重新整理頁面
    cy.reload();
    
    // 確認待辦事項仍然存在
    cy.contains(".todo-item", todoText).should("be.visible");
    
    // 清理：刪除測試用的待辦事項
    cy.contains(".todo-item", todoText)
      .find("button.todo-item-delete-button")
      .click();
  });
});
