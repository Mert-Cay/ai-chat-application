import {GoogleGenerativeAI} from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });


export const fetchMessages = async () => {
 return [
    { id: 1, text: "Merhaba! Ben Gemini. Sana nasıl yardımcı olabilirim?", sender: "bot" }
  ];
};

// Gerçek Gemini API çağrısı (Geçmiş hafızası ile birlikte)
export const sendMessageToServer = async ({ text, history }) => {
  try {
    // 1. Bizim mesaj dizimizi Gemini'nin istediği formata çeviriyoruz
    const formattedHistory = history
      .filter(msg => msg.id !== 1) // İlk açılıştaki sahte karşılama mesajını geçmişe dahil etmiyoruz
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

    // 2. Kullanıcının gönderdiği son mesajı da bu dizinin sonuna ekliyoruz
    formattedHistory.push({
      role: 'user',
      parts: [{ text: text }]
    });

    // 3. Modeli çağırırken 'text' yerine 'contents' dizisini veriyoruz
    const result = await model.generateContent({ contents: formattedHistory });
    const response = await result.response;
    const botText = response.text();

    return {
      id: Date.now(),
      text: botText,
      sender: "bot"
    };
  } catch (error) {
    console.error("API Hatası:", error);
    return {
      id: Date.now(),
      text: "Üzgünüm, sunucuya bağlanırken bir hata oluştu.",
      sender: "bot"
    };
  }
};