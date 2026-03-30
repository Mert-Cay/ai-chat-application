# 🤖 Yapay Zeka Destekli Chatbot Uygulaması

Bu proje, Google'ın **Gemini AI API'si** ve modern React teknolojileri kullanılarak geliştirilmiş, akıllı ve etkileşimli bir web sohbet asistanıdır. Kullanıcıların doğal dilde sorular sorup gerçek zamanlı, bağlama uygun yapay zeka yanıtları alabildiği duyarlı (responsive) bir arayüz sunar.

## 🚀 Proje Özellikleri

* **Bağlamsal Hafıza (Context-Awareness):** Sohbet geçmişi (history) API'ye dinamik olarak aktarılarak yapay zekanın önceki mesajları hatırlaması ve akıcı bir diyalog kurması sağlandı.
* **Gelişmiş State Management:** TanStack Query (React Query) kullanılarak sunucu durumu yönetimi ve veri önbellekleme (caching) optimize edildi.
* **Optimistic UI (İyimser Arayüz):** Kullanıcı mesaj gönderdiğinde, API yanıtı beklenmeden mesaj anında ekrana yansıtılarak (`setQueryData` ile) kesintisiz bir kullanıcı deneyimi sağlandı.
* **Kullanıcı Deneyimi (UX):** * "Bot Yazıyor..." (Typing Indicator) animasyonları.
  * Yeni mesaj geldiğinde otomatik olarak en alta kaydırma (Auto-scroll) özelliği.
  * Tek tıkla sohbet geçmişini (cache) temizleme fonksiyonu.
* **Güvenlik Mimarisi:** Çevresel değişkenler (.env) kullanılarak API anahtarlarının istemci tarafında güvenli bir şekilde yönetilmesi.

## 🛠️ Kullanılan Teknolojiler

* **Frontend:** React.js (Vite)
* **Veri Çekme & Durum Yönetimi:** TanStack Query (React Query)
* **Yapay Zeka Servisi:** Google Gemini API
* **Stil & UI:** Custom CSS / Flexbox mimarisi

## 📂 Kurulum ve Çalıştırma

Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

1. Projeyi klonlayın:
   ```bash
   git clone [https://github.com/Mert-Cay/ai-chat-application.git](https://github.com/Mert-Cay/ai-chat-application.git)
