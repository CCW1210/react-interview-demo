describe("Commodity Monitor E2E", () => {
  beforeEach(() => {
    // 更新拦截，使其匹配实际API调用
    cy.intercept("GET", "**/api/v3/quote/**", {
      body: [
        { 
          symbol: "GCUSD", 
          price: 1800, 
          timestamp: Date.now()/1000,
          change: 10,
          changesPercentage: 0.5,
          previousClose: 1790,
          dayHigh: 1815,
          dayLow: 1795
        },
        { 
          symbol: "SIUSD", 
          price: 22.5, 
          timestamp: Date.now()/1000,
          change: -0.3,
          changesPercentage: -1.2,
          previousClose: 22.8,
          dayHigh: 22.9,
          dayLow: 22.4
        },
        { 
          symbol: "CLUSD", 
          price: 75.8, 
          timestamp: Date.now()/1000,
          change: 1.2,
          changesPercentage: 1.6,
          previousClose: 74.6,
          dayHigh: 76.3,
          dayLow: 74.5
        }
      ]
    }).as("getQuotes");
    
    cy.intercept("GET", "**/api/v3/historical-price-full/**", {
      body: {
        symbol: "GCUSD",
        historical: [
          { date: "2023-04-01", close: 1795 },
          { date: "2023-04-02", close: 1800 },
          { date: "2023-04-03", close: 1810 }
        ]
      }
    }).as("getHistorical");
    
    cy.visit("/");
    cy.contains('a[data-discover="true"]', "大宗商品即時報價").click();
  });

  it("應該顯示商品卡片", () => {
    // 等待API數據加載
    cy.wait("@getQuotes");
    
    // 檢查商品卡片是否顯示
    cy.get(".commodity-cards").find(">div").should("exist");
  });
  
  it("點擊商品卡片後應顯示詳細資訊", () => {
    cy.wait("@getQuotes");
    
    // 點擊第一個卡片元素
    cy.get(".commodity-cards").find(">div").first().click();
    
    // 檢查詳細資訊區域是否顯示
    cy.get(".selected-details").should("be.visible");
  });
  
  it("應該顯示折線圖", () => {
    cy.wait("@getQuotes");
    cy.wait("@getHistorical");
    
    // 檢查圖表容器是否存在
    cy.get(".chart-container").should("exist");
  });
  
  it("點擊更新按鈕應刷新數據", () => {
    cy.wait("@getQuotes");
    
    // 重新攔截API請求
    cy.intercept("GET", "**/api/v3/quote/**", {
      body: [
        { symbol: "GCUSD", price: 1810, timestamp: Date.now()/1000 }
      ]
    }).as("refreshQuotes");
    
    // 點擊更新按鈕
    cy.get(".refresh-button").click();
    
    // 檢查是否發送了新的請求
    cy.wait("@refreshQuotes");
  });
});
