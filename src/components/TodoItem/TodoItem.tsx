import "./TodoItem.scss";

import type { Todo } from "../../api/storage";

export interface TodoItemProps {
  todo: Todo;
  onToggle(): void;
  onDelete(): void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className={`todo-item${todo.done ? " completed" : ""}`}>
      <div className="todo-content">
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            className="todo-checkbox"
            checked={todo.done}
            onChange={onToggle}
            id={`todo-${todo.id}`}
            aria-label={`標記 ${todo.text} 為${todo.done ? "未完成" : "已完成"}`}
          />
          <label htmlFor={`todo-${todo.id}`} className="custom-checkbox">
            <span className="visually-hidden">{todo.text}</span>
          </label>
        </div>
        <span className="todo-text">{todo.text}</span>
      </div>
      <button
        type="button"
        className="todo-item-delete-button"
        onClick={onDelete}
        aria-label="刪除待辦事項"
      >
        <span className="delete-icon">×</span>
      </button>
    </li>
  );
}
