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
    // 输入数据并等待一下
    cy.get('input[placeholder="描述"]').type("午餐");
    cy.get('input[placeholder="金額"]').type("150");
    cy.get('input[placeholder="類別"]').type("餐飲");
    
    // 点击提交
    cy.get('button.submit-button').click({force: true});
    
    // 等待一段时间让数据显示出来
    cy.wait(1000);
    
    // 检查是否添加了支出
    cy.contains("午餐").should("exist");
    cy.contains("150").should("exist");

    // 筛选支出
    cy.get("select#expense-filter").select("餐飲");
    cy.wait(500);
    cy.contains("午餐").should("exist");

    // 添加第二条记录
    cy.get('input[placeholder="描述"]').clear().type("捷運");
    cy.get('input[placeholder="金額"]').clear().type("50");
    cy.get('input[placeholder="類別"]').clear().type("交通");
    cy.get('button.submit-button').click({force: true});
    
    // 等待筛选生效
    cy.wait(1000);
    
    // 检查筛选结果 - 不应该显示"捷運"（因为当前筛选的是餐飲类别）
    cy.contains("捷運").should("not.exist");

    // 删除支出
    cy.get("button.expense-remove").first().click();
    cy.wait(500);
    
    // 检查是否已删除
    cy.contains("午餐").should("not.exist");
  });
  
  it("正確計算合計金額", () => {
    // 添加第一筆支出
    cy.get('input[placeholder="描述"]').type("早餐");
    cy.get('input[placeholder="金額"]').type("80");
    cy.get('input[placeholder="類別"]').type("餐飲");
    cy.get('button.submit-button').click({force: true});
    cy.wait(1000);
    
    // 添加第二筆支出
    cy.get('input[placeholder="描述"]').clear().type("午餐");
    cy.get('input[placeholder="金額"]').clear().type("120");
    cy.get('input[placeholder="類別"]').clear().type("餐飲");
    cy.get('button.submit-button').click({force: true});
    cy.wait(1000);
    
    // 检查总金额
    cy.get(".expense-amount.expense-tracker-summary").should("contain", "200");
    
    // 篩選測試
    cy.get("select#expense-filter").select("all");
    cy.wait(500);
    
    cy.get(".expense-amount.expense-tracker-summary").should("contain", "200");
    
    // 刪除一筆後再檢查合計
    cy.get("button.expense-remove").first().click();
    cy.wait(500);
    
    cy.get(".expense-amount.expense-tracker-summary").should("contain", "120");
  });
});
