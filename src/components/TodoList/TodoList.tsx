// src/components/TodoList/TodoList.tsx
import { useState } from 'react';
import TodoItem, { Todo } from '../TodoItem/TodoItem';
import './TodoList.scss';

interface TodoListProps {
  todos: Todo[];
  onToggle(id: number): void;
  onRemove(id: number): void;
}

export function TodoList({ todos, onToggle, onRemove }: TodoListProps) {
  const [filter, setFilter] = useState<'all' | 'todo' | 'done'>('all');

  const filtered = todos.filter((t) =>
    filter === 'all' ? true : filter === 'done' ? t.done : !t.done
  );

  return (
    <div className="container">
      <div className="filters">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          全部
        </button>
        <button
          className={filter === 'todo' ? 'active' : ''}
          onClick={() => setFilter('todo')}
        >
          進行中
        </button>
        <button
          className={filter === 'done' ? 'active' : ''}
          onClick={() => setFilter('done')}
        >
          已完成
        </button>
      </div>
      <ul className="items">
        {filtered.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onRemove={onRemove}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
