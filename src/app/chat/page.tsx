"use client"
import { useState } from "react";
import styles from "./chat.module.css";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim() === "") return;

    // Add user message immediately
    setMessages([...messages, { text: input, sender: "user" }]);
    const userInput = input;
    setInput("");
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Mocked API response
      const response = `Herve: ${userInput}`;
      setMessages(prev => [...prev, { text: response, sender: "herve" }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <main className={styles.container}>
      <div className={styles.chatWindow}>
        {messages.length === 0 && <p className={styles.placeholder}>No messages yet...</p>}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={msg.sender === "user" ? styles.userMessage : styles.herveMessage}
          >
            {msg.text}
          </div>
        ))}
        {loading && <p className={styles.loading}>Herve is typing...</p>}
      </div>

      <div className={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className={styles.input}
        />
        <button onClick={handleSend} className={styles.button}>
          Send
        </button>
      </div>
    </main>
  );
}
