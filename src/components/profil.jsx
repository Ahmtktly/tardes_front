// src/components/profil.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profil.css';

const Profil = () => {
  const [profil, setProfil] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('Giriş yapman gerekiyor!');
      window.location.href = '/giris';
      return;
    }

    axios
      .get('http://192.168.1.191:5300/profile/me', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      })
      .then((res) => {
        console.log('PROFILE GET RESPONSE:', res.data);

        // Eğer backend yanıtı { profile: { … } } şeklindeyse al, değilse doğrudan res.data
        const data = res.data.profile ?? res.data;

        if (!data || Object.keys(data).length === 0) {
          // Profil yoksa has_profile = false
          localStorage.setItem('has_profile', 'false');
          alert('Henüz profil oluşturulmamış. Lütfen oluşturun.');
          window.location.href = '/profil-olustur';
          return;
        }

        // Profil varsa has_profile = true
        localStorage.setItem('has_profile', 'true');
        setProfil(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Profil bilgisi alınamadı:', err);

        if (err.response?.status === 404) {
          localStorage.setItem('has_profile', 'false');
          alert('Profil oluşturulmamış. Hadi profil oluşturalım!');
          window.location.href = '/profil-olustur';
        } else {
          alert('Profil bilgisi alınamadı. Lütfen tekrar giriş yapın.');
          window.location.href = '/giris';
        }

        setLoading(false);
      });
  }, []);

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div className="profil-container">
      <h2>Profil Bilgilerin</h2>
      <div className="profil-card">
        <img src={profil.profil_foto_url} alt="Profil" />
        <p><strong>Bio:</strong> {profil.bio}</p>
        <p><strong>Favori Yemek:</strong> {profil.favori_yemek}</p>
        <p><strong>Şehir:</strong> {profil.sehir}</p>
      </div>
    </div>
  );
};

export default Profil;
