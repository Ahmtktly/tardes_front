import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AppBar from './components/AppBar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Giris from './pages/Giris';
import Kayit from './pages/Kayit';
import TardesChat from './pages/TardesChat';
import Profil from './pages/Profil';
import ProfilOlustur from './components/ProfilOlustur';


function App() {
  return (
    <Router>
      <AppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        
 
     
        <Route path="/giris" element={<Giris />} />
        <Route path="/kayit" element={<Kayit />} />
        <Route path="/tardes" element={<TardesChat />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/profil-olustur" element={<ProfilOlustur />} /> {/* 👈 burası yeni */}
      </Routes>
    </Router>
  );
}

export default App;
