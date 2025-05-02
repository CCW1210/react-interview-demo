// src/components/ChatApp/ChatApp.tsx
import "./ChatApp.scss";

import type { JSX } from "react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  sender: "me" | "server";
  text: string;
}

export default function ChatApp(): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const wsRef = useRef<WebSocket | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sock = new WebSocket("wss://echo.websocket.events");
    wsRef.current = sock;
    sock.addEventListener("message", (ev) => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), sender: "server", text: ev.data },
      ]);
    });
    return () => sock.close();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage() {
    const text = input.trim();
    if (!text) return;

    // **第一件事**：先把自己的訊息 push 進 state
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: "me", text },
    ]);
    setInput("");

    // **再**送給伺服器
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(text);
    }
  }

  return (
    <section className="chat-app">
      <Link to="/" className="back-home-link">
        ← 返回首頁
      </Link>

      <div className="chat-app-messages">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`chat-app-message chat-app-message-${m.sender}`}
          >
            {m.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="chat-app-input-area">
        <input
          type="text"
          className="chat-app-input"
          placeholder="輸入訊息後按 Enter 或點擊送出"
          aria-label="輸入訊息"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button
          type="button"
          className="chat-app-send-button"
          onClick={sendMessage}
        >
          送出
        </button>
      </div>
    </section>
  );
}
