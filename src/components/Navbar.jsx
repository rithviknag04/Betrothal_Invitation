import React from 'react';
import { NavLink } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="glass-nav">
      <div className="nav-container">
        <NavLink to="/" className="nav-logo">
          <span>P</span>
          <Heart className="nav-heart-icon" size={16} fill="currentColor" />
          <span>S</span>
        </NavLink>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="nav-links">
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              {t('Home')}
            </NavLink>
            {/* <NavLink to="/story" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              {t('Our Story')}
            </NavLink> */}
            <NavLink to="/gallery" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              {t('Gallery')}
            </NavLink>
            <NavLink to="/calendar" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              {t('Calendar')}
            </NavLink>
          </div>

          <button 
            onClick={() => setLanguage(language === 'en' ? 'kn' : 'en')}
            className="lang-toggle-btn"
            title={language === 'en' ? 'ಭಾಷೆಯನ್ನು ಬದಲಾಯಿಸಿ (ಕನ್ನಡ)' : 'Switch to English'}
          >
            {language === 'en' ? 'ಕನ್ನಡ' : 'EN'}
          </button>
        </div>
      </div>
    </nav>
  );
}
