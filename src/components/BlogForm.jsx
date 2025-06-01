import React, { useState } from 'react';
import axios from 'axios';

const BlogForm = ({ onEntryAdded }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [hashtags, setHashtags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Başlık ve içerik boş olamaz.");
      return;
    }

    try {
      await axios.post('http://192.168.1.191:5300/blog_save', {
        entry_title: title,
        content: content,
        hashtags: hashtags
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag.length > 0)
        // likes, dislikes, comments backend'de default olarak atanacak
      });

      setTitle('');
      setContent('');
      setHashtags('');
      onEntryAdded(); // Listeyi yenile
    } catch (error) {
      console.error('Gönderme hatası:', error);
      alert('❌ Blog gönderilemedi.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <input
        type="text"
        placeholder="Başlık"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: '100%',
          padding: '0.8rem',
          marginBottom: '1rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '1rem',
        }}
      />

      <textarea
        rows={6}
        placeholder="Yazınızı buraya yazın..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          width: '100%',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '1rem',
          marginBottom: '1rem',
        }}
      />

      <input
        type="text"
        placeholder="Etiketleri virgülle ayır (örnek: mutfak, sebze)"
        value={hashtags}
        onChange={(e) => setHashtags(e.target.value)}
        style={{
          width: '100%',
          padding: '0.8rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '1rem',
          marginBottom: '1rem',
        }}
      />

      <button
        type="submit"
        style={{
          backgroundColor: '#4caf50',
          color: '#fff',
          border: 'none',
          padding: '0.6rem 1.2rem',
          fontSize: '1rem',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Oluştur
      </button>
    </form>
  );
};

export default BlogForm;
