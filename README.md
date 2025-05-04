# React Interview Project

一個以 Vite + React 19 + TypeScript 為基礎，示範多種常見前端功能與整合的範例專案，包含 Todo List、天氣看板、電影搜尋、收支管理、即時聊天室與大宗商品報價等功能，並搭配單元測試（Jest）、E2E 測試（Cypress）、Redux Toolkit 狀態管理，以及 Material UI + Chart.js 視覺化。

本專案旨在提供一個完整的實戰樣板，展示如何在真實專案中結合現代前端開發工具與流程，並且可作為面試或學習練習用。

---

## 目錄

1. [安裝指南](#安裝指南)
2. [使用說明](#使用說明)
3. [技術架構](#技術架構)
4. [功能列表](#功能列表)
5. [測試](#測試)
6. [部署](#部署)
7. [License](#license)

---

## 安裝指南

1. **複製專案**

   ```bash
   git clone https://github.com/your-username/react-interview.git
   cd react-interview
   ```

2. **安裝依賴**

   ```bash
   npm install
   ```

3. **設定環境變數**

   專案使用 Financial Modeling Prep API 取得大宗商品價格，請建立 `.env` 檔並填入：

   ```env
   VITE_FMP_API_KEY=LNIvuJsrrMkCXmWMoKT1gET4dRFhFuMB
   VITE_OPENWEATHER_API_KEY=4eede336e2ea0989340f780f50a6475c
   ```

4. **啟動開發伺服器**

   ```bash
   npm run dev
   ```

   打開瀏覽器並前往 [http://localhost:5173](http://localhost:5173)

---

## 使用說明

| 功能                  | 說明                                                             |
| --------------------- | ---------------------------------------------------------------- |
| **Todo List**         | 新增、完成、刪除待辦事項，資料持久化於 localStorage              |
| **Weather Dashboard** | 即時查詢任意城市天氣                                             |
| **Movie Search**      | 關鍵字搜尋電影並顯示結果，含 loading／錯誤處理                   |
| **Expense Tracker**   | Redux 管理收支紀錄，支援新增、篩選、刪除，並存於 localStorage    |
| **Chat App**          | WebSocket 即時聊天室，訊息雙向互動並自動捲動                     |
| **Commodity Monitor** | 使用 Financial Modeling Prep API 取得大宗商品報價，Chart.js 繪圖 |

---

## 技術架構

- **開發工具**：Vite、TypeScript、React 19
- **路由**：React Router DOM
- **狀態管理**：Redux Toolkit + Redux Thunk
- **API 請求**：axios
- **圖表**：Chart.js
- **元件庫**：Material UI + SCSS
- **測試**：

  - 單元測試：Jest + React Testing Library
  - E2E 測試：Cypress

- **質管工具**：ESLint (Airbnb + TypeScript)、Prettier、Stylelint

**為何採用**

- Vite：快速冷啟動與 HMR
- React 19 + TS：強型別與最新語法支持
- Redux Toolkit：簡化 reducer 與非同步邏輯
- Chart.js：輕量易用的圖表繪製庫
- Material UI：豐富現成組件、易於美化
- Jest/Cypress：全面涵蓋單元與 E2E 測試

---

## 測試

- **單元測試 (Jest)**

  ```bash
  npm run test
  ```

- **E2E 測試 (Cypress)**

  ```bash
  npm run cypress:open    # 開啟互動 UI
  npm run cypress:run     # Headless 執行
  ```
