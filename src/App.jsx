// src/App.jsx
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import { fetchMessages, sendMessageToServer } from './services/api';
import './App.css';

function App() {
  const queryClient = useQueryClient();
  const [isBotTyping, setIsBotTyping] = useState(false);

  const { data: messages = [], isLoading, isError } = useQuery({
    queryKey: ['messages'],
    queryFn: fetchMessages,
    staleTime: Infinity, // Açılış mesajının tekrar tekrar yüklenmesini engeller
  });

  const mutation = useMutation({
    mutationFn: sendMessageToServer,
    onSuccess: (botResponse) => {
      // 3. Gemini'den cevap geldiğinde ekrana bas ve animasyonu durdur
      queryClient.setQueryData(['messages'], (old) => [...old, botResponse]);
      setIsBotTyping(false);
    },
    onError: () => {
      setIsBotTyping(false);
    }
  });

  const handleClearChat = () => {
    // Önbellekteki mesajları ezip sadece başlangıç mesajını bırakıyoruz
    queryClient.setQueryData(['messages'], [
      { id: 1, text: "Merhaba! Ben Gemini. Sana nasıl yardımcı olabilirim?", sender: "bot" }
    ]);
  };

  const handleSendMessage = (text) => {
    // 1. Kullanıcının mesajını anında ekrana ekle
    const newUserMessage = { id: Date.now(), text: text, sender: "user" };
    queryClient.setQueryData(['messages'], (old) => [...old, newUserMessage]);
    
    // 2. Bot yazıyor animasyonunu başlat
    setIsBotTyping(true);
    
    // 3. API'ye hem yeni metni hem de O ANKİ mesajlar dizisini (history) gönder
    mutation.mutate({ text: text, history: messages });
  };



  return (
    <div className="chat-container">
     <div className="chat-header">
        <span>Gemini AI Chatbox</span>
        {/* Temizle Butonumuz */}
        <button 
          className="clear-button" 
          onClick={handleClearChat}
          title="Sohbet Geçmişini Sil"
        >
          Temizle
        </button>
      </div>
      
      {isLoading && <div style={{ padding: '20px', textAlign: 'center' }}>Yükleniyor...</div>}
      {isError && <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>Sistem Hatası!</div>}
      
      {!isLoading && !isError && (
        <MessageList messages={messages} isBotTyping={isBotTyping} />
      )}
      
      <MessageInput 
        onSendMessage={handleSendMessage} 
        disabled={mutation.isPending}
      />
    </div>
  );
}

export default App;