// src/components/TodoInput.tsx
import React, { useState, FormEvent } from 'react';
import './TodoInput.scss';

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
        placeholder="輸入待辦事�?"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button type="submit" className="todo-input__btn">
        ?��?
      </button>
    </form>
  );
};

export default TodoInput;
