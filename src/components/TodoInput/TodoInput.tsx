import "./TodoInput.scss";

import { JSX, useState } from "react";

interface TodoInputProps {
  onAdd(text: string): void;
}

export default function TodoInput({ onAdd }: TodoInputProps): JSX.Element {
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
        className="field todo-input"
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
