import "./TodoItem.scss";

import { JSX } from "react";

import { Todo } from "../../api/storage";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

export function TodoItem({
  todo,
  onToggle,
  onRemove,
}: TodoItemProps): JSX.Element {
  const id = `todo-${todo.id}`;

  return (
    <div className="todo-item">
      <input
        id={id}
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <label htmlFor={id} className={todo.done ? "done" : ""}>
        {todo.text}
      </label>
      <button type="button" onClick={() => onRemove(todo.id)}>
        刪除
      </button>
    </div>
  );
}

export default TodoItem;
