import "./TodoList.scss";

import { JSX } from "react";

import { Todo } from "../../api/storage";
import TodoItem from "../TodoItem/TodoItem";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

export function TodoList({
  todos,
  onToggle,
  onRemove,
}: TodoListProps): JSX.Element {
  if (todos.length === 0) {
    return <p>目前沒有待辦事項</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((t) => (
        <li key={t.id}>
          <TodoItem todo={t} onToggle={onToggle} onRemove={onRemove} />
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
