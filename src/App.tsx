// src/App.tsx
import React, { useEffect, useState } from 'react';
import TodoInput from './components/TodoInput/TodoInput';
import TodoList from './components/TodoList/TodoList';
import { loadTodos, saveTodos, Todo } from './api/storage';
import './app.scss';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const handleAdd = (text: string) => {
    const newTodo: Todo = { id: Date.now(), text, done: false };
    setTodos([newTodo, ...todos]);
  };

  const handleToggle = (id: number) => {
    setTodos(todos.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const handleRemove = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <TodoInput onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} onRemove={handleRemove} />
    </div>
  );
};

export default App;
