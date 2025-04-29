// src/components/TodoInput/TodoInput.tsx
import "./TodoInput.scss";

import React, { useState } from "react";

interface TodoInputProps {
  onAdd(text: string): void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }
    onAdd(trimmed);
    setText("");
  }

  return (
    <form className="container" onSubmit={handleSubmit}>
      <input
        type="text"
        className="field"
        placeholder="輸入待辦事項"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="btn">
        新增
      </button>
    </form>
  );
}

export default TodoInput;
