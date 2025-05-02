import "./TodoList.scss";

import type { Todo } from "../../api/storage";
import TodoItem from "../TodoItem/TodoItem";

export interface TodoListProps {
  todos: Todo[];
  onToggle(id: string): void;
  onRemove(id: string): void;
}

export default function TodoList({ todos, onToggle, onRemove }: TodoListProps) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => onToggle(todo.id)}
          onDelete={() => onRemove(todo.id)}
        />
      ))}
    </ul>
  );
}
