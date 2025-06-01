import React, { useState, useEffect, useRef } from 'react';
import './AppBar.css';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const AppBar = () => {
  const isLoggedIn = localStorage.getItem('user') !== null;
  const hasProfile = localStorage.getItem('has_profile')=== 'true';
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // dışa tıklayınca kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="appbar">
      <div className="logo">Tardes</div>

      <nav className="nav-links">
        <Link to="/">Tarifler</Link>
        <Link to="/blog">Blog</Link>
   
     

        <div className="auth-right">
          {isLoggedIn ? (
            <div className="profile-container" ref={dropdownRef}>
              <FaUserCircle
                className="profile-icon"
                onClick={() => setShowDropdown((prev) => !prev)}
              />
              {showDropdown && (
                <div className="profile-dropdown">
                  {hasProfile && <Link to="/profil">Profil</Link>}

                  {!hasProfile && <Link to="/profil-olustur">Profil Oluştur</Link>}

                  
                  <Link to="/ayarlar">Ayarlar</Link>
                  <a
                    onClick={() => {
                      localStorage.removeItem('user');
                      localStorage.removeItem('access_token')
                      localStorage.removeItem('has_profile')
                      window.location.href = '/';
                    }}
                  >
                    Çıkış Yap
                  </a>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/giris">Giriş Yap</Link>
              <Link to="/kayit">Kayıt Ol</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default AppBar;
