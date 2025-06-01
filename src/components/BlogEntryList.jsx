import React, { useState } from 'react';
import axios from 'axios';

const BlogEntryList = ({ entries }) => {
  const [commentTexts, setCommentTexts] = useState({});
  const [localLikes, setLocalLikes] = useState([]);
  const [localComments, setLocalComments] = useState({});

  const handleLike = async (entryId) => {
    const token = localStorage.getItem('access_token');
    if (!token) return alert('Giriş yapmadan beğenemezsin.');

    try {
      await axios.post(
        `http://192.168.1.191:5300/blog/${entryId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLocalLikes((prev) => [...prev, entryId]);
      alert('🟢 Beğendin!');
    } catch (error) {
      console.error('Beğeni hatası:', error);
      alert('❌ Beğeni gönderilemedi.');
    }
  };

  const handleCommentChange = (entryId, value) => {
    setCommentTexts((prev) => ({ ...prev, [entryId]: value }));
  };

  const handleCommentSubmit = async (entryId) => {
    // 1) Token kontrolü
    const token = localStorage.getItem('access_token');
    if (!token) {
      return alert('Yorum için giriş yapmanız gerekir.');
    }

    // 2) User objesini al & parse et
    const userStr = localStorage.getItem('user');
    // Buraya eklenen kontrol:
    if (!userStr || userStr === 'undefined') {
      return alert('Kullanıcı bilgisi bulunamadı. Lütfen yeniden giriş yapın.');
    }

    let user;
    try {
      user = JSON.parse(userStr);
    } catch (err) {
      console.error('User parse hatası:', err);
      return alert('Kullanıcı bilgisi bozuk. Tekrar giriş yapın.');
    }

    // 3) Username kontrolü
    const username = user.kullanici_adi || user.username;
    if (!username) {
      return alert('Kullanıcı adı okunamadı. Lütfen tekrar giriş yapın.');
    }

    // 4) Yorum metni boş mu?
    const yorum = (commentTexts[entryId] || '').trim();
    if (!yorum) {
      return alert('Yorum boş olamaz!');
    }

    // 5) API çağrısı
    try {
      await axios.post(
        `http://192.168.1.191:5300/blog/${entryId}/comment`,
        {
          username,
          comment: yorum,
          timestamp: new Date().toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Yorum listesini güncelle
      setLocalComments((prev) => ({
        ...prev,
        [entryId]: [...(prev[entryId] || []), yorum],
      }));
      // Input’u temizle
      setCommentTexts((prev) => ({ ...prev, [entryId]: '' }));
      alert('🟢 Yorum gönderildi!');
    } catch (error) {
      console.error('Yorum hatası:', error);
      alert('❌ Yorum gönderilemedi.');
    }
  };

  if (!entries || entries.length === 0) {
    return <p style={{ color: '#666', marginTop: '2rem' }}>Henüz yazı yok.</p>;
  }

  return (
    <div>
      {entries.map((entry) => (
        <div
          key={entry._id}
          style={{
            border: '1px solid #ddd',
            padding: '1rem',
            borderRadius: '10px',
            marginTop: '1rem',
            backgroundColor: '#fdfdfd',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <p style={{ marginBottom: '0.5rem', fontSize: '1.05rem' }}>
            {entry.entry_title || 'Başlık bulunamadı'}
          </p>

          {Array.isArray(entry.hashtags) && entry.hashtags.length > 0 && (
            <div style={{ marginBottom: '0.5rem' }}>
              {entry.hashtags.map((tag, i) => (
                <span
                  key={i}
                  style={{
                    backgroundColor: '#e0f7fa',
                    color: '#00796b',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    marginRight: '0.4rem',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {entry.created_at && (
            <small style={{ color: '#999' }}>
              {new Date(entry.created_at).toLocaleString()}
            </small>
          )}

          <div style={{ marginTop: '0.8rem' }}>
            <button
              onClick={() => handleLike(entry._id)}
              style={{
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                marginRight: '10px',
              }}
            >
              ❤️ Beğen
            </button>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <input
              type="text"
              placeholder="Yorum yaz..."
              value={commentTexts[entry._id] || ''}
              onChange={(e) =>
                handleCommentChange(entry._id, e.target.value)
              }
              style={{
                width: '80%',
                padding: '6px',
                marginRight: '8px',
                borderRadius: '6px',
                border: '1px solid #ccc',
              }}
            />
            <button
              onClick={() => handleCommentSubmit(entry._id)}
              style={{
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                padding: '6px 10px',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Gönder
            </button>
          </div>

          {localComments[entry._id] && localComments[entry._id].length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <strong>Yorumlar:</strong>
              {localComments[entry._id].map((cmt, i) => (
                <div key={i} style={{ fontSize: '0.9rem', marginTop: '4px' }}>
                  - {cmt}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BlogEntryList;
