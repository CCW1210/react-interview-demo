// src/components/TodoItem/TodoItem.tsx
import './TodoItem.scss';

export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle(id: number): void;
  onRemove(id: number): void;
}

export function TodoItem({ todo, onToggle, onRemove }: TodoItemProps) {
  return (
    <li className={todo.done ? 'done' : ''}>
      <label>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
        />
        <span className="text">{todo.text}</span>
      </label>
      <button className="remove" onClick={() => onRemove(todo.id)}>
        ×
      </button>
    </li>
  );
}

export default TodoItem;
