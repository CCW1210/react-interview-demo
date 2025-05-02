import "../App.scss";

import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { loadTodos, saveTodos, Todo as StorageTodo } from "../api/storage";
import TodoInput from "../components/TodoInput/TodoInput";
import TodoList from "../components/TodoList/TodoList";

export function TodoPage() {
  const [todos, setTodos] = useState<StorageTodo[]>([]);

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

  return (
    <div className="app-container">
      <Link to="/" className="back-home-link">
        ← 返回首頁
      </Link>

      <h1>Todo List</h1>
      <TodoInput onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} onRemove={handleRemove} />
    </div>
  );
}

export default TodoPage;
