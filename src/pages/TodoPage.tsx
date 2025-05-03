import "../App.scss";
import "../styles/common.scss";
import "./TodoPage.scss";

import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { loadTodos, saveTodos, Todo as StorageTodo } from "../api/storage";
import TodoInput from "../components/TodoInput/TodoInput";
import TodoList from "../components/TodoList/TodoList";

export function TodoPage() {
  const [todos, setTodos] = useState<StorageTodo[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const handleAdd = useCallback((text: string) => {
    const newTodo: StorageTodo = {
      id: Date.now().toString(),
      text,
      done: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
  }, []);

  const handleToggle = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              done: !t.done,
            }
          : t
      )
    );
  }, []);

  const handleRemove = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.done;
    if (filter === "completed") return todo.done;
    return true;
  });

  const activeTodoCount = todos.filter((todo) => !todo.done).length;
  const completedTodoCount = todos.filter((todo) => todo.done).length;

  const getFilterText = () => {
    if (filter === "active") return "未完成";
    if (filter === "completed") return "已完成";
    return "";
  };

  return (
    <div className="todo-page page-container">
      <Link to="/" className="back-home-button">
        <span className="back-icon" />
      </Link>

      <div className="page-header">
        <h1>待辦事項管理</h1>
        <p className="page-subtitle">輕鬆管理您的日常任務</p>
      </div>

      <div className="todo-dashboard">
        <div className="todo-stat-card">
          <div className="stat-value">{todos.length}</div>
          <div className="stat-label">全部事項</div>
        </div>
        <div className="todo-stat-card">
          <div className="stat-value">{activeTodoCount}</div>
          <div className="stat-label">未完成</div>
        </div>
        <div className="todo-stat-card">
          <div className="stat-value">{completedTodoCount}</div>
          <div className="stat-label">已完成</div>
        </div>
      </div>

      <div className="todo-container">
        <TodoInput onAdd={handleAdd} />

        <div className="todo-filters">
          <button
            type="button"
            className={`filter-button ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            全部
          </button>
          <button
            type="button"
            className={`filter-button ${filter === "active" ? "active" : ""}`}
            onClick={() => setFilter("active")}
          >
            未完成
          </button>
          <button
            type="button"
            className={`filter-button ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            已完成
          </button>
        </div>

        <TodoList
          todos={filteredTodos}
          onToggle={handleToggle}
          onRemove={handleRemove}
        />

        {filteredTodos.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <p>目前沒有{getFilterText()}待辦事項</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoPage;
