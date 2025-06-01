import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogForm from '../components/BlogForm';
import BlogEntryList from '../components/BlogEntryList';

const Blog = () => {
  const [entries, setEntries] = useState([]);

  const fetchEntries = async () => {
    try {
      const res = await axios.get('http://192.168.1.191:5300/blog_get');
      console.log('Gelen veri:', res.data);
      setEntries(res.data.blogs); // 🔧 sadece burayı düzeltiyoruz
    } catch (error) {
      console.error('Veri çekme hatası:', error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <h2>Tardes Blog</h2>
      <BlogForm onEntryAdded={fetchEntries} />
      <BlogEntryList entries={entries} />
    </div>
  );
};

export default Blog;
