import React, { useState } from 'react';
import axios from 'axios';
import './KayitForm.css'; // Stil varsa kullan, yoksa silebilirsin

const KayitForm = () => {
  const [form, setForm] = useState({
    kullanici_adi: '',
    sifre: '',
    dogum_tarihi: '',
    cinsiyet: 'male',
    sehir: 'ist',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form verisi:", form);

    try {
      const response = await axios.post(
        'http://192.168.1.191:5300/user_register',
        {
          kullanici_adi: form.kullanici_adi,
          sifre: form.sifre,
          dogum_tarihi: form.dogum_tarihi,
          cinsiyet: form.cinsiyet,
          sehir: form.sehir,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      alert('🟢 Kayıt başarılı: ' + response.data.message);
    } catch (error) {
      console.error('❌ Gönderme hatası:', error);

      if (error.response && error.response.data && error.response.data.detail) {
        alert('❌ Hata: ' + error.response.data.detail);
      } else {
        alert('❌ Kayıt başarısız! Sunucuya ulaşılamadı.');
      }
    }
  };

  return (
    <div className="container">
      <h1>Kullanıcı Kayıt</h1>
      <form className="box" onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="kullanici_adi">Kullanıcı Adı:</label>
          <input
            type="text"
            id="kullanici_adi"
            name="kullanici_adi"
            value={form.kullanici_adi}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <label htmlFor="sifre">Şifre:</label>
          <input
            type="password"
            id="sifre"
            name="sifre"
            value={form.sifre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <label htmlFor="dogum_tarihi">Doğum Tarihi:</label>
          <input
            type="date"
            id="dogum_tarihi"
            name="dogum_tarihi"
            value={form.dogum_tarihi}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <label htmlFor="cinsiyet">Cinsiyet:</label>
          <select
            id="cinsiyet"
            name="cinsiyet"
            value={form.cinsiyet}
            onChange={handleChange}
          >
            <option value="male">Erkek</option>
            <option value="female">Kadın</option>
            <option value="other">Diğer</option>
          </select>
        </div>

        <div className="row">
          <label htmlFor="sehir">Şehir:</label>
          <select
            id="sehir"
            name="sehir"
            value={form.sehir}
            onChange={handleChange}
          >
            <option value="ist">İstanbul</option>
            <option value="ank">Ankara</option>
            <option value="izm">İzmir</option>
          </select>
        </div>

        <div className="row">
          <button type="submit">Kayıt Ol</button>
        </div>
      </form>
    </div>
  );
};

export default KayitForm;