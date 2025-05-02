// cypress/e2e/weather.cy.ts
describe("WeatherDashboard 功能測試", () => {
  beforeEach(() => {
    // 這兩個路徑要跟你的 fetchCoordinates / fetchFiveDayForecast axios URL 對上
    cy.intercept("GET", "**/geo/1.0/direct**", { fixture: "coords.json" }).as(
      "getCoords"
    );
    cy.intercept("GET", "**/data/2.5/onecall**", {
      fixture: "forecast.json",
    }).as("getForecast");
    cy.visit("/weatherDashboard");
  });

  it("預設用 Taipei，並顯示卡片", () => {
    cy.wait("@getCoords");
    cy.wait("@getForecast");
    cy.get(".weather-dashboard-card").should("have.length", 5);
  });

  it("輸入新城市時會呼叫 API 並更新", () => {
    cy.get("input[placeholder='輸入城市，例如 Taipei']")
      .clear()
      .type("Kaohsiung");
    cy.intercept("GET", "**/geo/1.0/direct?**Kaohsiung**", {
      fixture: "coords.json",
    }).as("getCoords2");
    cy.intercept("GET", "**/data/2.5/onecall**", {
      fixture: "forecast.json",
    }).as("getForecast2");
    cy.get("button").contains("查詢").click();

    cy.wait("@getCoords2");
    cy.wait("@getForecast2");
    cy.get(".weather-dashboard-card").should("have.length", 5);
  });
});
