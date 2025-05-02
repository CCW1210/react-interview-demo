// src/App.tsx

import "./App.scss";

import { JSX } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ChatApp from "./components/ChatApp/ChatApp";
import ExpenseTracker from "./components/ExpenseTracker/ExpenseTracker";
import Home from "./components/Home/Home";
import MovieSearch from "./components/MovieSearch/MovieSearch";
import WeatherDashboard from "./components/WeatherDashboard/WeatherDashboard";
import TodoPage from "./pages/TodoPage";

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todoList" element={<TodoPage />} />
        <Route path="/weatherDashboard" element={<WeatherDashboard />} />
        <Route path="/movieSearch" element={<MovieSearch />} />
        <Route path="/expenseTracker" element={<ExpenseTracker />} />
        <Route path="/chatApp" element={<ChatApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
