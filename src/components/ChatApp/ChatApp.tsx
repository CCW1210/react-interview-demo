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
  const [input, setInput] = useState<string>("");
  const wsRef = useRef<WebSocket | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const socket = new WebSocket("wss://echo.websocket.events");
    wsRef.current = socket;
    socket.addEventListener("message", (event) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "server",
          text: event.data,
        },
      ]);
    });
    return () => socket.close();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage(): void {
    const text = input.trim();
    if (!text || wsRef.current?.readyState !== WebSocket.OPEN) {
      return;
    }
    wsRef.current.send(text);
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: "me", text },
    ]);
    setInput("");
  }

  return (
    <section className="chat-app">
      <Link to="/" className="back-home-link">
        ← 返回首頁
      </Link>

      <div className="chat-app-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-app-message chat-app-message-${msg.sender}`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="chat-app-input-area">
        <input
          type="text"
          className="chat-app-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="輸入訊息後按 Enter 或點擊送出"
          aria-label="輸入訊息"
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
