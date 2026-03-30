// src/components/MessageList.jsx
import React, { useEffect, useRef } from 'react';
import TypingIndicator from './TypingIndicator'; // Bileşeni import ettik

const MessageList = ({ messages, isBotTyping }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Hem mesajlar değiştiğinde hem de bot yazmaya başladığında aşağı kaydır
  useEffect(() => {
    scrollToBottom();
  }, [messages, isBotTyping]);

  return (
    <div className="message-list">
      {messages.map((msg) => (
        <div 
          key={msg.id} 
          className={`message-bubble ${msg.sender === 'user' ? 'message-user' : 'message-bot'}`}
        >
          {msg.text}
        </div>
      ))}
      
      {/* Eğer bot yazıyorsa animasyonu göster */}
      {isBotTyping && <TypingIndicator />}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;