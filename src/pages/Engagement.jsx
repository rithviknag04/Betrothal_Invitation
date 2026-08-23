import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Heart, ArrowLeft, Shirt, Sparkles, RefreshCw } from 'lucide-react';
import Countdown from '../components/Countdown';
import { useLanguage } from '../context/LanguageContext';
import engagementInviteEn from '../assets/engagement_invite_en.png';
import engagementInviteKn from '../assets/engagement_invite_kn.png';
import palatte from '../assets/palatte.jpeg'

export default function Engagement() {
  const { language, t } = useLanguage();
  
  // Easily update the date and location details below:
  const engagementDateString = "2026-09-20T10:00:00"; // Date format: YYYY-MM-DDTHH:MM:SS
  const engagementDateFormatted = t("20th September 2026");
  const engagementLocation = t("LUXE by Atmosphere, Mysuru");

  // State to control card flip (false = English / Front, true = Kannada / Back)
  const [isFlipped, setIsFlipped] = useState(false);

  // Automatically flip card based on global language selection (Default: English)
  useEffect(() => {
    if (language === 'kn') {
      setIsFlipped(true);
    } else if (language === 'en') {
      setIsFlipped(false);
    }
  }, [language]);

  const handleCardFlip = () => {
    setIsFlipped(prev => !prev);
  };

  return (
    <div className="engagement-page animate-fade-in">
      <section className="section page-header-section" style={{ paddingBottom: '20px' }}>
        <div className="container text-center">
          <Link to="/" className="btn-secondary" style={{ marginBottom: '24px', display: 'inline-flex', padding: '8px 16px', letterSpacing: '1px', textTransform: 'none' }}>
            <ArrowLeft size={16} style={{ marginRight: '8px' }} />
            {t('Back to Welcome')}
          </Link>
          <h1 className="page-title" style={{ fontSize: '3rem', marginBottom: '8px' }}>{t('Ring Ceremony')}</h1>
          <h2 className="Page-title" style={{ fontSize: '1rem', marginBottom: '4px' }}>{t('of')}</h2>
          <p className="page-subtitle" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>{t('Prajwala Nag & Shravan Kumar')}</p>
          <p className="page-date" style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-accent)' }}>{engagementDateFormatted}</p>
          <div className="botanical-divider">
            <div className="botanical-line"></div>
            <div className="botanical-icon">
              <Heart size={16} fill="currentColor" />
            </div>
            <div className="botanical-line"></div>
          </div>
        </div>
      </section>

      {/* Interactive Back-to-Back Floating Invitation Card */}
      <section className="invitation-card-section text-center" style={{ padding: '10px 0 20px' }}>
        <div className="container" style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="invite-flip-wrapper animate-float">
            <div 
              className="invite-flip-container"
              onClick={handleCardFlip}
              title={t('Click card to flip language')}
            >
              <div className={`invite-flip-card ${isFlipped ? 'is-flipped' : ''}`}>
                {/* Front: English Invitation */}
                <div className="invite-card-front">
                  <img 
                    src={engagementInviteEn} 
                    alt="Engagement Invitation (English)" 
                    className="invite-card-img" 
                  />
                </div>
                {/* Back: Kannada Invitation */}
                <div className="invite-card-back">
                  <img 
                    src={engagementInviteKn} 
                    alt="Engagement Invitation (Kannada)" 
                    className="invite-card-img" 
                  />
                </div>
              </div>
            </div>
            
            <button className="flip-hint-badge" onClick={handleCardFlip}>
              <RefreshCw size={16} />
              <span>{isFlipped ? t('Click to view English Invitation') : t('Click to view Kannada Invitation')}</span>
            </button>
          </div>
        </div>
      </section>
      <section className="engagement-countdown-section" style={{ padding: '20px 0 80px' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <div className="glass-panel text-center countdown-wrap-card">
            <span className="hero-eyebrow" style={{ display: 'block', marginBottom: '12px' }}>{t('Countdown to the Engagement')}</span>
            <Countdown targetDate={engagementDateString} />
          </div>
        </div>
      </section>
      <section className="events-grid-section" style={{ padding: '20px 0 40px' }}>
        <div className="container">
          {/* Top 2-Column Grid: Event Flow & Venue */}
          <div className="grid-2" style={{ alignItems: 'stretch' }}>
            {/* Flow of the Event */}
            <div className="details-card glass-panel">
              <div className="details-card-header" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <Sparkles className="details-header-icon" size={24} style={{ color: 'var(--text-gold)' }} />
                <h2>{t('Flow of the Event')}</h2>
              </div>
              <div className="schedule-list">
                <div className="schedule-item">
                  <span className="schedule-time">9:00 AM</span>
                  <div className="schedule-dot"></div>
                  <div className="schedule-info">
                    <h4>{t('Lagna Pathrike Ritual Starts')}</h4>
                  </div>
                </div>
                <div className="schedule-item">
                  <span className="schedule-time">11:00 AM</span>
                  <div className="schedule-dot"></div>
                  <div className="schedule-info">
                    <h4>{t('Ring Exchange Event Starts With Group Dance')}</h4>
                  </div>
                </div>
                <div className="schedule-item">
                  <span className="schedule-time">11:30 AM</span>
                  <div className="schedule-dot"></div>
                  <div className="schedule-info">
                    <h4>{t('Cake Cut')}</h4>
                  </div>
                </div>
                <div className="schedule-item">
                  <span className="schedule-time">11:45 AM</span>
                  <div className="schedule-dot"></div>
                  <div className="schedule-info">
                    <h4>{t('Jamming Session BY SOUL FRET')}</h4>
                  </div>
                </div>
                <div className="schedule-item">
                  <span className="schedule-time">12:00 PM</span>
                  <div className="schedule-dot"></div>
                  <div className="schedule-info">
                    <h4>{t('Guests Lunch Starts')}</h4>
                  </div>
                </div>
                <div className="schedule-item">
                  <span className="schedule-time">2:30 PM</span>
                  <div className="schedule-dot"></div>
                  <div className="schedule-info">
                    <h4>{t('Ring Ceremony Event Concludes')}</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* The Venue */}
            <div className="details-card glass-panel">
              <div className="details-card-header" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <MapPin className="details-header-icon" size={24} style={{ color: 'var(--text-gold)' }} />
                <h2>{t('Venue')}</h2>
              </div>
              <div className="venue-info">
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '8px' }}>{engagementLocation}</h3>
                <p className="venue-desc" style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  {t('A beautifully decorated hall chosen for this special occasion, setting a warm and joyful ambiance for the ring ceremony.')}
                </p>
                <a 
                  href="https://maps.app.goo.gl/XT3cfnBiZa6WMh1r8"
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="map-placeholder glass-card map-link-card" 
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textDecoration: 'none', cursor: 'pointer' }}
                >
                  <MapPin size={24} className="map-pin-icon" style={{ color: 'var(--text-gold)' }} />
                  <p style={{ margin: '0', fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-accent)' }}>{t('View Venue on Google Maps')}</p>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{t('Click to open driving directions')}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Stretched Full-Width Dress Code Section below both Event Flow & Venue */}
          <div className="details-card glass-panel dress-code-stretched-card">
            <div className="details-card-header" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Shirt className="details-header-icon" size={24} style={{ color: 'var(--text-gold)' }} />
              <h2>{t('Dress Code')}</h2>
            </div>
            <div className="dress-code-content-grid">
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '12px' }}>{t('Festive Wear')}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.7', fontSize: '1rem' }}>
                  {t('We would love for you to celebrate with us in elegant traditional attire. Kurtha for Men and boys, Saree for Women and Lehenga for Girls are recommended!')}
                </p>
                <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--text-gold)', fontWeight: '600', margin: 0 }}>
                  {t('Please try to follow suggested colour palette below.')}
                </p>
              </div>
              <div className="palette_cont">
                <img
                  src={palatte} 
                  alt="palette" 
                  className="palette_img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
