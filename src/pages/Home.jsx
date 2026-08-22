import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import coupleHero from '../assets/couple_hero.png';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="home-page animate-fade-in-scale">
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-card glass-panel">
            <span className="hero-eyebrow">{t('Welcome to the Wedding Plan of')}</span>
            <h1 className="hero-title">{t('Prajwala Nag & Shravan Kumar')}</h1>
            
            <div className="botanical-divider">
              <div className="botanical-line"></div>
              <div className="botanical-icon">
                <Heart size={18} fill="currentColor" />
              </div>
              <div className="botanical-line"></div>
            </div>
            
            <p className="hero-intro-text" style={{ margin: '24px 0', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
              {t('We are so excited to celebrate our love and begin this new chapter together. Please select a ceremony below to explore details, locations, and countdowns.')}
            </p>
            
            <div className="hero-actions">
              <Link to="/engagement" className="btn-primary">
                {t('Engagement')}
              </Link>
              <Link to="/wedding" className="btn-secondary">
                {t('Wedding')}
              </Link>
            </div>
          </div>
          
          <div className="hero-image-container">
            <div className="hero-image-wrapper">
              <img src={coupleHero} alt="Prajwala & Shravan" className="hero-image animate-float" />
              <div className="hero-image-border"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
