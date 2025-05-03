describe("MovieSearch 功能測試", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains('a[data-discover="true"]', "電影搜尋與收藏").click();
  });

  it("輸入關鍵字後顯示過濾結果", () => {
    // 攔截正常搜索結果
    cy.intercept("GET", "**/movies**", { fixture: "movies.json" }).as(
      "getMovies"
    );
    
    cy.get("input.movie-search-input").type("Inception");
    cy.contains("button", "搜尋").click();
    cy.wait("@getMovies");
    
    // 改成新的 DOM 結構：movie-search-grid 下的 article.card
    cy.get(".movie-search-grid .movie-search-card")
      .its("length")
      .should("be.greaterThan", 0);
  });
  
  it("顯示加載狀態", () => {
    // 攔截請求但延遲回應
    cy.intercept("GET", "**/movies**", {
      delay: 1000,
      fixture: "movies.json"
    }).as("getMoviesDelayed");
    
    cy.get("input.movie-search-input").type("Loading Test");
    cy.contains("button", "搜尋").click();
    
    // 檢查是否顯示加載中訊息
    cy.contains("載入中...").should("be.visible");
    
    // 等待請求完成
    cy.wait("@getMoviesDelayed");
  });
  
  it("處理錯誤狀態", () => {
    // 攔截請求並回傳錯誤
    cy.intercept("GET", "**/movies**", {
      statusCode: 500,
      body: { error: "Server error" }
    }).as("getMoviesError");
    
    cy.get("input.movie-search-input").type("Error Test");
    cy.contains("button", "搜尋").click();
    
    cy.wait("@getMoviesError");
    // 檢查是否顯示錯誤訊息
    cy.contains("錯誤").should("be.visible");
  });
});
