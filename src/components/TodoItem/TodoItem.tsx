import "./TodoItem.scss";

import type { Todo } from "../../store/todoSlice";

export interface TodoItemProps {
  todo: Todo;
  onToggle(): void;
  onDelete(): void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className={`todo-item${todo.completed ? " completed" : ""}`}>
      <input type="checkbox" checked={todo.completed} onChange={onToggle} />
      <span>{todo.text}</span>
      <button type="button" onClick={onDelete}>
        刪除
      </button>
    </li>
  );
}
