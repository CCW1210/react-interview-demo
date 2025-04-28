// src/components/TodoItem/TodoItem.tsx
import React from 'react';
import './TodoItem.scss';

export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onRemove }) => {
  return (
    <li className={`todo-item${todo.done ? ' done' : ''}`}>
      <label>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
        />
        <span className="todo-item__text">{todo.text}</span>
      </label>
      <button
        className="todo-item__remove"
        onClick={() => onRemove(todo.id)}
      >
        ?
      </button>
    </li>
  );
};

export default TodoItem;
