// src/components/MessageInput.jsx
import React, { useState } from 'react';

const MessageInput = ({ onSendMessage , disabled }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini engeller
    
    // Boş mesaj gönderilmesini engelle
    if (inputValue.trim() !== '') {
      onSendMessage(inputValue);
      setInputValue(''); // Mesaj iletildikten sonra input'u temizle
    }
  };

  // Geri dönüş kısmını sınıflara göre uyarla
  return (
    <form className="input-container" onSubmit={handleSubmit}>
      <input
        type="text"
        className="input-field"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Bir mesaj yazın..."
        disabled={disabled}
      />
      <button 
        type="submit" 
        className="send-button"
        disabled={disabled || inputValue.trim() === ''}
      >
        Gönder
      </button>
    </form>
  );
};

export default MessageInput;