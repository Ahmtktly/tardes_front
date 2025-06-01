// src/components/GirisForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './GirisForm.css';

// JWT’den payload’ı güvenli şekilde parse eden yardımcı
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('JWT parse hatası:', e);
    return null;
  }
}

const GirisForm = () => {
  const [form, setForm] = useState({
    kullanici_adi: '',
    sifre: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://192.168.1.191:5300/login',
        {
          username: form.kullanici_adi,
          password: form.sifre,
        }
      );

      console.log('LOGIN RESPONSE:', response.data);
      const { token, message } = response.data;
      if (!token) {
        return alert('❌ Giriş başarısız: token alınamadı.');
      }

      // 1) Eğer backend user objesi veriyorsa al, yoksa token'dan çıkar
      let kulAdi;
      if (response.data.user && response.data.user.kullanici_adi) {
        kulAdi = response.data.user.kullanici_adi;
      } else {
        const payload = parseJwt(token);
        if (!payload || !payload.sub) {
          return alert('❌ Giriş başarısız: kullanıcı bilgisi alınamadı.');
        }
        kulAdi = payload.sub;
      }

      // 2) localStorage’a kaydet
      localStorage.setItem('access_token', token);
      localStorage.setItem(
        'user',
        JSON.stringify({ kullanici_adi: kulAdi })
      );

      alert('🟢 Giriş başarılı: ' + message);
      window.location.href = '/';
    } catch (error) {
      console.error('Giriş hatası:', error);
      alert('❌ Giriş başarısız! Kullanıcı adı veya şifre yanlış.');
    }
  };

  return (
    <div className="container">
      <h2>Kullanıcı Giriş</h2>
      <form className="box" onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="kullanici_adi">Kullanıcı Adı</label>
          <input
            type="text"
            id="kullanici_adi"
            name="kullanici_adi"
            placeholder="Kullanıcı adını girin"
            value={form.kullanici_adi}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <label htmlFor="sifre">Şifre</label>
          <input
            type="password"
            id="sifre"
            name="sifre"
            placeholder="Şifrenizi girin"
            value={form.sifre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <button type="submit">Giriş Yap</button>
        </div>
      </form>
    </div>
  );
};

export default GirisForm;
