import React, { useState } from 'react';
import axios from 'axios';
import './ProfilOlustur.css';

const ProfilOlustur = () => {
  const [form, setForm] = useState({
    bio: '',
    favori_yemek: '',
    sehir: '',
    profil_foto_url: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');

    if (!token) {
      alert('Giriş yapılmamış! Token yok.');
      window.location.href = '/giris';
      return;
    }

    try {
      await axios.post(
        'http://192.168.1.191:5300/profile/create',
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      localStorage.setItem('has_profile','true')

      alert('🟢 Profil başarıyla oluşturuldu!');
      window.location.href = '/profil';
    } catch (error) {
      console.error('Profil oluşturma hatası:', error);
      alert('❌ Profil oluşturulamadı!');
    }
  };

  return (
    <div className="profil-container">
      <h2>Profilini Oluştur</h2>
      <form className="profil-form" onSubmit={handleSubmit}>
        <div className="row">
          <label>Bio:</label>
          <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} />
        </div>

        <div className="row">
          <label>Favori Yemek:</label>
          <input type="text" name="favori_yemek" value={form.favori_yemek} onChange={handleChange} />
        </div>

        <div className="row">
          <label>Şehir:</label>
          <input type="text" name="sehir" value={form.sehir} onChange={handleChange} />
        </div>

        <div className="row">
          <label>Profil Fotoğrafı URL:</label>
          <input type="text" name="profil_foto_url" value={form.profil_foto_url} onChange={handleChange} />
        </div>

        <div className="row">
          <button type="submit">Profili Kaydet</button>
        </div>
      </form>
    </div>
  );
};

export default ProfilOlustur;