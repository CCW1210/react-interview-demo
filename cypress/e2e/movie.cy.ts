// cypress/e2e/movie.cy.ts
/// <reference types="cypress" />

describe("MovieSearch 功能測試 (SampleAPIs 版)", () => {
  beforeEach(() => {
    cy.visit("/movieSearch");
    cy.intercept("GET", "https://api.sampleapis.com/movies/action", {
      fixture: "movies.json", // 你可在 cypress/fixtures/movies.json 準備假資料
    }).as("getMovies");
  });

  it("輸入關鍵字後顯示過濾結果", () => {
    cy.wait("@getMovies");
    cy.get('input[placeholder="輸入電影關鍵字"]').type("Batman");
    cy.contains("搜尋").click();
    cy.get(".movie-search-card").each(($card) => {
      cy.wrap($card).contains(/Batman/i);
    });
  });
});
