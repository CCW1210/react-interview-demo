import "./Home.scss";

import type { JSX } from "react";
import { Link } from "react-router-dom";

interface FeatureCard {
  title: string;
  path: string;
  icon: string;
  description: string;
  bgColor: string;
}

export default function Home(): JSX.Element {
  const features: FeatureCard[] = [
    {
      title: "大宗商品即時報價",
      path: "/commodityMonitor",
      icon: "📊",
      description: "追蹤黃金、白銀和原油等大宗商品的即時價格與走勢圖",
      bgColor: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    },
    {
      title: "Todo List清單管理器",
      path: "/todoList",
      icon: "✅",
      description: "簡單高效的待辦事項管理工具，幫助您組織日常任務",
      bgColor: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
    },
    {
      title: "天氣預報看板",
      path: "/weatherDashboard",
      icon: "🌤️",
      description: "查詢全球城市的天氣預報，掌握最新氣象資訊",
      bgColor: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
    },
    {
      title: "電影搜尋與收藏",
      path: "/movieSearch",
      icon: "🎬",
      description: "搜尋您喜愛的電影資訊，並收藏感興趣的影片",
      bgColor: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
    },
    {
      title: "收支管理／金流紀錄",
      path: "/expenseTracker",
      icon: "💰",
      description: "記錄您的收入與支出，幫助您更好地管理個人財務",
      bgColor: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    },
    {
      title: "即時聊天室",
      path: "/chatApp",
      icon: "💬",
      description: "體驗即時通訊功能，隨時與他人進行對話交流",
      bgColor: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
    },
  ];

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>React 應用功能展示</h1>
        <p className="home-subtitle">探索我們豐富多樣的互動功能</p>
      </div>

      <div className="features-grid">
        {features.map((feature) => (
          <Link
            to={feature.path}
            key={feature.path}
            className="feature-card"
            data-discover="true"
            style={{ background: feature.bgColor }}
          >
            <div className="card-icon">{feature.icon}</div>
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
            <div className="card-arrow">→</div>
          </Link>
        ))}
      </div>

      <footer className="home-footer">
        <p>
          &copy; {new Date().getFullYear()} React 面試專案 |
          所有功能僅作展示用途
        </p>
      </footer>
    </div>
  );
}
