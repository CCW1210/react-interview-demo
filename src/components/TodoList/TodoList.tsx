import "./TodoList.scss";

import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../store";
import { deleteTodo, type Todo, toggleTodo } from "../../store/todoSlice";
import TodoItem from "../TodoItem/TodoItem";

/**
 * 把 handler 抽出去，減少 JSX 裡的 inline function
 */
function makeHandlers(id: string, dispatch: AppDispatch) {
  return {
    onToggle: () => dispatch(toggleTodo(id)),
    onDelete: () => dispatch(deleteTodo(id)),
  };
}

export default function TodoList() {
  const todos = useSelector((s: RootState) => s.todos.list);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <ul className="todo-list">
      {todos.map((todo: Todo) => {
        const { onToggle, onDelete } = makeHandlers(todo.id, dispatch);
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        );
      })}
    </ul>
  );
}
