// src/components/TodoList/TodoList.tsx

import "./TodoList.scss";

import { JSX } from "react";

import { Todo } from "../../api/storage";
import TodoItem from "../TodoItem/TodoItem";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export function TodoList({
  todos,
  onToggle,
  onRemove,
}: TodoListProps): JSX.Element {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

export default TodoList;
