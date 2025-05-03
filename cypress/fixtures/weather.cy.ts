describe("WeatherDashboard 功能測試", () => {
  beforeEach(() => {
    // 直接拦截请求并返回5个天气卡片的数据
    cy.intercept("GET", "**/geo/1.0/direct*", { fixture: "coords.json" }).as(
      "getCoords"
    );
    
    // 修改拦截策略，直接返回组件期望的日期数据
    cy.intercept("GET", "**/data/2.5/forecast*", (req) => {
      req.reply({
        statusCode: 200,
        body: {
          list: Array(40).fill(0).map((_, i) => ({
            dt: Date.now()/1000 + i * 3600, // 每小时一条数据
            main: {
              temp_min: 20,
              temp_max: 30
            },
            weather: [{
              id: 800,
              main: "Clear",
              description: "晴天",
              icon: "01d"
            }]
          }))
        }
      });
    }).as("getForecast");
    
    cy.visit("/weatherDashboard");
  });

  it("預設用 Taipei，並顯示卡片", () => {
    cy.wait("@getCoords");
    cy.wait("@getForecast");
    // 给一点时间让组件渲染
    cy.wait(1000);
    cy.get(".weather-dashboard-card").should("have.length.at.least", 1);
  });

  it("輸入新城市時會呼叫 API 並更新", () => {
    cy.get("input[placeholder='輸入城市，例如 Taipei']")
      .clear()
      .type("Kaohsiung");
      
    // 拦截第二次请求  
    cy.intercept("GET", "**/geo/1.0/direct*", { fixture: "coords.json" }).as(
      "getCoords2"
    );
    
    // 拦截第二次天气数据请求
    cy.intercept("GET", "**/data/2.5/forecast*", (req) => {
      req.reply({
        statusCode: 200,
        body: {
          list: Array(40).fill(0).map((_, i) => ({
            dt: Date.now()/1000 + i * 3600,
            main: {
              temp_min: 25,
              temp_max: 35
            },
            weather: [{
              id: 800,
              main: "Clear",
              description: "晴天",
              icon: "01d"
            }]
          }))
        }
      });
    }).as("getForecast2");
    
    cy.get("button").contains("查詢").click();

    cy.wait("@getCoords2");
    cy.wait("@getForecast2");
    // 给一点时间让组件渲染
    cy.wait(1000);
    cy.get(".weather-dashboard-card").should("have.length.at.least", 1);
  });
}); 