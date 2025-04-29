import "../App.scss";

import { JSX, useCallback, useEffect, useState } from "react";

import { loadTodos, saveTodos, Todo } from "../api/storage";
import TodoInput from "../components/TodoInput/TodoInput";
import TodoList from "../components/TodoList/TodoList";

export function TodoPage(): JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const handleAdd = useCallback((text: string) => {
    const newTodo: Todo = { id: Date.now(), text, done: false };
    setTodos((prev) => [newTodo, ...prev]);
  }, []);

  const handleToggle = useCallback((id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }, []);

  const handleRemove = useCallback((id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <TodoInput onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} onRemove={handleRemove} />
    </div>
  );
}

export default TodoPage;
