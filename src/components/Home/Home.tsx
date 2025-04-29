import "./Home.scss";

import { JSX } from "react";
import { Link } from "react-router-dom";

interface MenuItem {
  path: string;
  label: string;
}

const items: readonly MenuItem[] = [
  { path: "/todoList", label: "Todo List 清單管理器（初階）" },
  { path: "/weatherDashboard", label: "天氣預報看板（中階 I）" },
  { path: "/movieSearch", label: "電影搜尋與收藏（中階 II）" },
  { path: "/expenseTracker", label: "收支管理／金流紀錄（進階 I）" },
  { path: "/chatApp", label: "即時聊天室（進階 II）" },
];

export function Home(): JSX.Element {
  return (
    <div className="home">
      <h1>功能總覽</h1>
      <ul className="list">
        {items.map((item) => (
          <li key={item.path}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
