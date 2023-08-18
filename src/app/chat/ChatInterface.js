"use client"
import { useState } from 'react';
import styles from './chat.module.css';

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    // Add logic to send the message and update the messages state
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatWindow}>
        {/* Display messages */}
        {messages.map((message, index) => (
          <div key={index} className={styles.message}>
            {message}
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          className={styles.input}
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage(e.target.value);
              e.target.value = '';
            }
          }}
        />
      </div>
    </div>
  );
}
