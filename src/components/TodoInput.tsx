// src/components/TodoInput.tsx
import React, { useState, FormEvent } from 'react';
import '../styles/components/todo-input.scss';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText('');
  };

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input__field"
        placeholder="輸入待辦事項"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button type="submit" className="todo-input__btn">
        新增
      </button>
    </form>
  );
};

export default TodoInput;
