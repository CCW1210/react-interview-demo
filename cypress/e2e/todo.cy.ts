describe('Todo 端到端測試', () => {
  it('新增、切換、刪除 Todo', () => {
    cy.visit('/');
    cy.contains('Todo List').click();
    cy.url().should('include', '/todoList');

    cy.get('input[placeholder=\"新增待辦事項\"]').type('Cypress 測試');
    cy.get('button').contains('新增').click();
    cy.contains('Cypress 測試').should('exist');

    cy.get('input[type=\"checkbox\"]').check();
    cy.get('input[type=\"checkbox\"]').should('be.checked');

    cy.get('button').contains('刪除').click();
    cy.contains('Cypress 測試').should('not.exist');
  });
});
