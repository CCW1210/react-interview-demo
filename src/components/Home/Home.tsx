import "./Home.scss";

import type { JSX } from "react";
import { Link } from "react-router-dom";

export default function Home(): JSX.Element {
  return (
    <div className="home">
      <h1>功能總覽</h1>
      <ul className="list">
        <li>
          <Link data-discover="true" to="/todoList">
            Todo List清單管理器 代辦事項
          </Link>
        </li>
        <li>
          <Link data-discover="true" to="/weatherDashboard">
            天氣預報看板
          </Link>
        </li>
        <li>
          <Link data-discover="true" to="/movieSearch">
            電影搜尋與收藏
          </Link>
        </li>
        <li>
          <Link data-discover="true" to="/expenseTracker">
            收支管理／金流紀錄
          </Link>
        </li>
        <li>
          <Link data-discover="true" to="/chatApp">
            即時聊天室
          </Link>
        </li>
      </ul>
    </div>
  );
}
