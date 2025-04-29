import "./Home.scss";

import { JSX } from "react";
import { Link } from "react-router-dom";

interface MenuItem {
  path: string;
  label: string;
}

const items: readonly MenuItem[] = [
  { path: "/todoList", label: "Todo List清單管理器" },
  { path: "/weatherDashboard", label: "天氣預報看板" },
  { path: "/movieSearch", label: "電影搜尋與收藏）" },
  { path: "/expenseTracker", label: "收支管理／金流紀錄" },
  { path: "/chatApp", label: "即時聊天室" },
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
