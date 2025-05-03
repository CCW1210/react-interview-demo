import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import ChatApp from "./components/ChatApp/ChatApp";
import CommodityMonitor from "./components/CommodityMonitor/CommodityMonitor";
import ExpenseTracker from "./components/ExpenseTracker/ExpenseTracker";
import Home from "./components/Home/Home";
import HomeButton from "./components/HomeButton";
import MovieSearch from "./components/MovieSearch/MovieSearch";
import WeatherDashboard from "./components/WeatherDashboard/WeatherDashboard";
import TodoPage from "./pages/TodoPage";

const AppContent = () => {
  const location = useLocation();
  const showHomeButton = location.pathname !== '/';

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todoList" element={<TodoPage />} />
        <Route path="/weatherDashboard" element={<WeatherDashboard />} />
        <Route path="/movieSearch" element={<MovieSearch />} />
        <Route path="/expenseTracker" element={<ExpenseTracker />} />
        <Route path="/chatApp" element={<ChatApp />} />
        <Route path="/commodityMonitor" element={<CommodityMonitor />} />
      </Routes>
      {showHomeButton && <HomeButton />}
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
