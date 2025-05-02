// src/components/TodoItem/TodoItem.tsx

import "./TodoItem.scss";

import { JSX } from "react";

import { Todo } from "../../api/storage";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export function TodoItem({
  todo,
  onToggle,
  onRemove,
}: TodoItemProps): JSX.Element {
  const idAttr = `todo-${todo.id}`;

  return (
    <div className="todo-item">
      <input
        id={idAttr}
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <label htmlFor={idAttr} className={todo.done ? "done" : ""}>
        {todo.text}
      </label>
      <button type="button" onClick={() => onRemove(todo.id)}>
        刪除
      </button>
    </div>
  );
}

export default TodoItem;
