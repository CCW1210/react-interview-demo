describe("MovieSearch 功能測試", () => {
  beforeEach(() => {
    // 攔截 GET /movies?q=…
    cy.intercept("GET", "**/movies**", { fixture: "movies.json" }).as(
      "getMovies"
    );
    cy.visit("/");
    cy.contains('a[data-discover="true"]', "電影搜尋與收藏").click();
  });

  it("輸入關鍵字後顯示過濾結果", () => {
    cy.get("input.movie-search-input").type("Inception");
    cy.contains("button", "搜尋").click();
    cy.wait("@getMovies");
    // 改成新的 DOM 結構：movie-search-grid 下的 article.card
    cy.get(".movie-search-grid .movie-search-card")
      .its("length")
      .should("be.greaterThan", 0);
  });
});
