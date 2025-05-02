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
    cy.get("ul.movie-search-list > li").should("have.length.greaterThan", 0);
  });
});
