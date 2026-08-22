import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Heart, ArrowLeft, Shirt, Sparkles } from 'lucide-react';
import Countdown from '../components/Countdown';
import { useLanguage } from '../context/LanguageContext';

export default function Wedding() {
  const { t } = useLanguage();

  return (
    <div className="wedding-page animate-fade-in">
      <section className="section page-header-section" style={{ paddingBottom: '20px' }}>
        <div className="container text-center">
          <Link to="/" className="btn-secondary" style={{ marginBottom: '24px', display: 'inline-flex', padding: '8px 16px', letterSpacing: '1px', textTransform: 'none' }}>
            <ArrowLeft size={16} style={{ marginRight: '8px' }} />
            {t('Back to Welcome')}
          </Link>
          <h1 className="page-title" style={{ fontSize: '3rem', marginBottom: '8px' }}>{t('The Wedding Celebration')}</h1>
          <p className="page-subtitle" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>{t('Prajwala Nag & Shravan Kumar')}</p>
          <div className="botanical-divider">
            <div className="botanical-line"></div>
            <div className="botanical-icon">
              <Heart size={16} fill="currentColor" />
            </div>
            <div className="botanical-line"></div>
          </div>
        </div>
      </section>

      <section className="wedding-countdown-section" style={{ padding: '20px 0' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <div className="glass-panel text-center countdown-wrap-card">
            <span className="hero-eyebrow" style={{ display: 'block', marginBottom: '12px' }}>{t('Countdown to the Big Day')}</span>
            <Countdown targetDate="2026-12-13T19:00:00" />
          </div>
        </div>
      </section>

      <section className="events-grid-section" style={{ padding: '40px 0 80px' }}>
        <div className="container">
          <div className="grid-2">
            {/* The Details */}
            <div className="details-card glass-panel">
              <div className="details-card-header" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <Calendar className="details-header-icon" size={24} style={{ color: 'var(--text-gold)' }} />
                <h2>{t('Date & Time')}</h2>
              </div>
              <div className="schedule-list">
                <div className="schedule-item" style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                  <span className="schedule-time" style={{ fontWeight: '600', color: 'var(--text-accent)', minWidth: '80px' }}>Dec 11</span>
                  <div className="schedule-info">
                    <h4 style={{ fontFamily: 'var(--font-sans)', fontWeight: '600' }}>{t('Mehendi Ceremony')}</h4>
                    <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>{t('6:00 PM onwards — Henna, music, and celebrations.')}</p>
                  </div>
                </div>
                <div className="schedule-item" style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                  <span className="schedule-time" style={{ fontWeight: '600', color: 'var(--text-accent)', minWidth: '80px' }}>Dec 12</span>
                  <div className="schedule-info">
                    <h4 style={{ fontFamily: 'var(--font-sans)', fontWeight: '600' }}>{t('Haldi & Sangeet Night')}</h4>
                    <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>{t('10:00 AM (Haldi) & 6:00 PM (Sangeet dance performances).')}</p>
                  </div>
                </div>
                <div className="schedule-item" style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                  <span className="schedule-time" style={{ fontWeight: '600', color: 'var(--text-accent)', minWidth: '80px' }}>Dec 13</span>
                  <div className="schedule-info">
                    <h4 style={{ fontFamily: 'var(--font-sans)', fontWeight: '600' }}>{t('Wedding & Reception')}</h4>
                    <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>{t('Sacred Muhurtham rituals followed by reception dinner.')}</p>
                  </div>
                </div>
                <div className="schedule-item" style={{ display: 'flex', gap: '16px' }}>
                  <span className="schedule-time" style={{ fontWeight: '600', color: 'var(--text-accent)', minWidth: '80px' }}>Dec 14</span>
                  <div className="schedule-info">
                    <h4 style={{ fontFamily: 'var(--font-sans)', fontWeight: '600' }}>{t('Blessings & Lunch')}</h4>
                    <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>{t('Gala lunch gathering to bless the newlywed couple.')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* The Venue */}
            <div className="details-card glass-panel">
              <div className="details-card-header" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <MapPin className="details-header-icon" size={24} style={{ color: 'var(--text-gold)' }} />
                <h2>{t('The Venue')}</h2>
              </div>
              <div className="venue-info">
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '8px' }}>{t('Vinayaka Convention')}</h3>
                <p className="venue-address" style={{ fontWeight: '500', color: 'var(--text-accent)', marginBottom: '16px' }}>{t('Mysuru, Karnataka, India')}</p>
                <p className="venue-desc" style={{ color: 'var(--text-secondary)' }}>
                  {t('A magnificent and spacious convention hall perfect for hosting traditional Indian wedding celebrations. Ample parking space is available at the venue.')}
                </p>
                <a 
                  href="https://maps.app.goo.gl/rbJAkSdWV3f6h6Sh8" 
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

            {/* Dress Code */}
            <div className="details-card glass-panel">
              <div className="details-card-header" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <Shirt className="details-header-icon" size={24} style={{ color: 'var(--text-gold)' }} />
                <h2>{t('Dress Code')}</h2>
              </div>
              <div className="venue-info">
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '8px' }}>{t('Vibrant Traditional Indian Wear')}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  {t('We would love for you to celebrate with us in traditional Indian festive attire. Bright, joyful colors are highly encouraged to match the auspicious occasion!')}
                </p>
                <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--text-gold)', fontWeight: '600' }}>
                  {t('Color Ideas: Deep maroon, mustard yellow, royal blue, emerald green, and classic cream.')}
                </p>
              </div>
            </div>

            {/* Flow of the Event */}
            <div className="details-card glass-panel">
              <div className="details-card-header" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <Sparkles className="details-header-icon" size={24} style={{ color: 'var(--text-gold)' }} />
                <h2>{t('Flow of the Event')}</h2>
              </div>
              <div className="schedule-list">
                <div className="schedule-item" style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                  <span className="schedule-time" style={{ fontWeight: '600', color: 'var(--text-accent)', minWidth: '70px' }}>09:00 AM</span>
                  <div className="schedule-info">
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '600' }}>{t('Welcoming the Groom (Baraat)')}</h4>
                  </div>
                </div>
                <div className="schedule-item" style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                  <span className="schedule-time" style={{ fontWeight: '600', color: 'var(--text-accent)', minWidth: '70px' }}>10:00 AM</span>
                  <div className="schedule-info">
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '600' }}>{t('Ceremony & Muhurtham')}</h4>
                  </div>
                </div>
                <div className="schedule-item" style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                  <span className="schedule-time" style={{ fontWeight: '600', color: 'var(--text-accent)', minWidth: '70px' }}>12:30 PM</span>
                  <div className="schedule-info">
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '600' }}>{t('Traditional Feast (Elai Oon)')}</h4>
                  </div>
                </div>
                <div className="schedule-item" style={{ display: 'flex', gap: '16px' }}>
                  <span className="schedule-time" style={{ fontWeight: '600', color: 'var(--text-accent)', minWidth: '70px' }}>06:30 PM</span>
                  <div className="schedule-info">
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '600' }}>{t('Reception & Celebration')}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
