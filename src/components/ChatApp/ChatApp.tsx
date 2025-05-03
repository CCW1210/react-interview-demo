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
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const messageIdRef = useRef(0);

  const createMessage = (sender: "me" | "server", text: string): Message => {
    messageIdRef.current += 1;
    return {
      id: `${messageIdRef.current}`,
      sender,
      text,
    };
  };

  useEffect(() => {
    const sock = new WebSocket("wss://echo.websocket.events");
    wsRef.current = sock;

    sock.addEventListener("open", () => {
      setIsConnected(true);
      setMessages((prev) => [
        ...prev,
        createMessage(
          "server",
          "已連接到聊天室，這是一個回音測試服務，您發送的訊息會被伺服器回傳。"
        ),
      ]);
    });

    sock.addEventListener("message", (ev) => {
      setMessages((prev) => [...prev, createMessage("server", ev.data)]);
    });

    sock.addEventListener("close", () => {
      setIsConnected(false);
      setMessages((prev) => [...prev, createMessage("server", "連接已斷開")]);
    });

    return () => sock.close();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage() {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, createMessage("me", text)]);
    setInput("");

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(text);
    }
  }

  return (
    <section className="chat-app">
      <Link to="/" className="back-home-button" aria-label="返回首頁" />

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
          placeholder="輸入訊息後按 Enter 或點擊發送按鈕"
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
          disabled={!isConnected}
        >
          發送
        </button>
      </div>
    </section>
  );
}
