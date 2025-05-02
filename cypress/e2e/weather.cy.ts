// cypress/e2e/weather.cy.ts
/// <reference types="cypress" />

describe("WeatherDashboard 功能測試", () => {
  beforeEach(() => {
    cy.visit("/weatherDashboard");
    cy.intercept("GET", "**/geo/1.0/direct*", {
      statusCode: 200,
      body: [{ lat: 25, lon: 121, name: "Taipei" }],
    }).as("getCoords");
    cy.intercept("GET", "**/forecast*", {
      statusCode: 200,
      body: {
        daily: [
          {
            dt: 1,
            temp: { day: 20 },
            weather: [{ icon: "01d", description: "晴" }],
          },
          {
            dt: 2,
            temp: { day: 22 },
            weather: [{ icon: "02d", description: "多雲" }],
          },
          // ...多筆資料
        ],
      },
    }).as("getForecast");
  });

  it("預設用 Taipei，並顯示卡片", () => {
    cy.wait("@getCoords");
    cy.wait("@getForecast");
    cy.get(".weather-dashboard-card").should("have.length.at.least", 2);
    cy.contains("最高：20").should("exist");
  });

  it("輸入新城市時會呼叫 API 並更新", () => {
    cy.get("input").clear().type("Kaohsiung");
    cy.intercept("GET", "**/geo/1.0/direct*", {
      statusCode: 200,
      body: [{ lat: 22.6, lon: 120.3, name: "Kaohsiung" }],
    }).as("getCoords2");
    cy.wait("@getCoords2");
    cy.wait("@getForecast");
    cy.get(".weather-dashboard-card").should("be.visible");
  });
});
