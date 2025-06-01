# 🥘 Tardes - Yemek Tarifi, Blog ve Chatbot Uygulaması

**Tardes**, kullanıcıların yemek tarifleri görüntüleyip paylaşabildiği, blog yazıları yazıp yorum yapabildiği, profil bilgilerini oluşturabildiği ve ayrıca yapay zekâ destekli bir sohbet robotu (chatbot) ile iletişim kurabildiği etkileşimli bir web uygulamasıdır.

Uygulama React ile geliştirilmiştir ve FastAPI tabanlı bir backend servisiyle haberleşmektedir.

---

## 🚀 Özellikler

### 🔐 Kullanıcı Giriş ve Kayıt
- Kullanıcılar kullanıcı adı, şifre, doğum tarihi, cinsiyet ve şehir bilgileriyle kayıt olabilir.
- JWT tabanlı kullanıcı doğrulama yapılır.
- Giriş sonrası bilgiler `localStorage`'a kaydedilir.

### 🧑‍💼 Profil Oluşturma ve Görüntüleme
- Kullanıcılar giriş yaptıktan sonra profil oluşturabilir.
- Profilde şu bilgiler yer alır:
  - Bio
  - Favori yemek
  - Şehir
  - Profil fotoğrafı URL’si
- Profil oluşturulmamışsa sistem otomatik olarak yönlendirir.

### 📒 Blog Yazıları
- Kullanıcılar başlık, içerik ve etiketler girerek blog yazısı paylaşabilir.
- Yazılara diğer kullanıcılar:
  - ❤️ Beğeni gönderebilir
  - 💬 Yorum yapabilir
- Beğeni ve yorum işlemleri sadece giriş yapılmış kullanıcılar tarafından yapılabilir.

### 💬 Tardes Chatbot
- Yapay zekâ destekli chatbot ile kullanıcılar etkileşim kurabilir.
- Mesajlaşma kısmı ayrı bir sayfada çalışmaktadır.
- Geliştirme süreci devam etmektedir.

### 🧭 Navigasyon ve UI
- Her sayfa `React Router` ile yönlendirilir.
- Navigasyon çubuğunda kullanıcı durumuna göre "Profil", "Profil Oluştur", "Giriş Yap", "Çıkış Yap" gibi bağlantılar dinamik olarak değişir.
- Responsive ve sade bir kullanıcı arayüzüne sahiptir.
- Formlar kullanıcı dostu validasyonlarla desteklenmiştir.

---

## ⚙️ Teknolojiler

- **React.js**  
- **Axios** – API istekleri için  
- **React Router** – Sayfa geçişleri için  
- **CSS** – Özel stiller ve komponent düzeni  
- **JWT** – Kullanıcı doğrulama

---

## 👨‍💻 Gelistirici

- Ahmet KUTLUAY
- Ahmet Said ATEŞ
