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
      <input
        type="checkbox"
        className="todo-item-checkbox"
        checked={todo.done}
        onChange={onToggle}
      />
      <span className={todo.done ? "done" : ""}>{todo.text}</span>
      <button
        type="button"
        className="todo-item-delete-button"
        onClick={onDelete}
      >
        刪除
      </button>
    </li>
  );
}
