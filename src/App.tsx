import "./App.scss";

import { JSX } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home/Home";
import TodoPage from "./pages/TodoPage";

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todoList" element={<TodoPage />} />
        <Route
          path="/weatherDashboard"
          element={<div>天氣預報看板，敬請期待</div>}
        />
        <Route
          path="/movieSearch"
          element={<div>電影搜尋與收藏，敬請期待</div>}
        />
        <Route
          path="/expenseTracker"
          element={<div>收支管理／金流紀錄，敬請期待</div>}
        />
        <Route path="/chatApp" element={<div>即時聊天室，敬請期待</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
