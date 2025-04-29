// src/App.tsx
import React, { useState, useEffect } from 'react';
import TodoInput from './components/TodoInput/TodoInput';
import TodoList from './components/TodoList/TodoList';
import { loadTodos, saveTodos, Todo } from './api/storage';
import './App.scss';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  function handleAdd(text: string) {
    const newTodo: Todo = { id: Date.now(), text, done: false };
    setTodos([newTodo, ...todos]);
  }

  function handleToggle(id: number) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function handleRemove(id: number) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <TodoInput onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} onRemove={handleRemove} />
    </div>
  );
}

export default App;
