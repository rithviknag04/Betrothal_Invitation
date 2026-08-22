import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Heart, ArrowLeft, Shirt, Sparkles } from 'lucide-react';
import Countdown from '../components/Countdown';
import { useLanguage } from '../context/LanguageContext';

export default function HaldiSangeet() {
  const { t } = useLanguage();

  return (
    <div className="haldi-sangeet-page animate-fade-in">
      <section className="section page-header-section" style={{ paddingBottom: '20px' }}>
        <div className="container text-center">
          <Link to="/calendar" className="btn-secondary" style={{ marginBottom: '24px', display: 'inline-flex', padding: '8px 16px', letterSpacing: '1px', textTransform: 'none' }}>
            <ArrowLeft size={16} style={{ marginRight: '8px' }} />
            {t('Back to Calendar')}
          </Link>
          <h1 className="page-title" style={{ fontSize: '3rem', marginBottom: '8px' }}>{t('Haldi & Sangeet Ceremonies')}</h1>
          <p className="page-subtitle" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>{t('Prajwala Nag & Shravan Kumar')}</p>
          <p className="page-date" style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-accent)' }}>{t('December 12th, 2026')}</p>
          <div className="botanical-divider">
            <div className="botanical-line"></div>
            <div className="botanical-icon">
              <Heart size={16} fill="currentColor" />
            </div>
            <div className="botanical-line"></div>
          </div>
        </div>
      </section>

      <section className="events-grid-section" style={{ padding: '40px 0 40px' }}>
        <div className="container">
          <div className="grid-2">
            {/* The Venue */}
            <div className="details-card glass-panel">
              <div className="details-card-header" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <MapPin className="details-header-icon" size={24} style={{ color: 'var(--text-gold)' }} />
                <h2>{t('The Venue')}</h2>
              </div>
              <div className="venue-info">
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '8px' }}>{t('Atmosphere')}</h3>
                <p className="venue-address" style={{ fontWeight: '500', color: 'var(--text-accent)', marginBottom: '16px' }}>{t('Mysuru, Karnataka, India')}</p>
                <p className="venue-desc" style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  {t('Haldi will take place at the Sunlit Courtyard, and Sangeet is hosted inside the Grand Ballroom.')}
                </p>
                <a 
                  href="https://maps.app.goo.gl/mrCJF1aKULHWHMcS6?g_st=aw" 
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
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '8px' }}>{t('Vibrant / Indo-Western Festive')}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  {t('For the Haldi, yellow/mustard ethnic wear is highly recommended. For the Sangeet night, dress in your best Indo-Western or glittering ethnic outfits!')}
                </p>
                <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--text-gold)', fontWeight: '600' }}>
                  {t('Color Ideas: Mustard yellow, turmeric gold (Haldi); Royal blue, magenta, emerald, black, or gold (Sangeet).')}
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
                  <span className="schedule-time" style={{ fontWeight: '600', color: 'var(--text-accent)', minWidth: '70px' }}>10:00 AM</span>
                  <div className="schedule-info">
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '600' }}>{t('Haldi Ceremonial rituals')}</h4>
                  </div>
                </div>
                <div className="schedule-item" style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                  <span className="schedule-time" style={{ fontWeight: '600', color: 'var(--text-accent)', minWidth: '70px' }}>12:30 PM</span>
                  <div className="schedule-info">
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '600' }}>{t('Traditional South Indian Lunch')}</h4>
                  </div>
                </div>
                <div className="schedule-item" style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                  <span className="schedule-time" style={{ fontWeight: '600', color: 'var(--text-accent)', minWidth: '70px' }}>06:00 PM</span>
                  <div className="schedule-info">
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '600' }}>{t('Sangeet Stage Performances & DJ')}</h4>
                  </div>
                </div>
                <div className="schedule-item" style={{ display: 'flex', gap: '16px' }}>
                  <span className="schedule-time" style={{ fontWeight: '600', color: 'var(--text-accent)', minWidth: '70px' }}>08:00 PM</span>
                  <div className="schedule-info">
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '600' }}>{t('Dinner is served')}</h4>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="haldi-countdown-section" style={{ padding: '20px 0 80px' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <div className="glass-panel text-center countdown-wrap-card">
            <span className="hero-eyebrow" style={{ display: 'block', marginBottom: '12px' }}>{t('Countdown to Haldi & Sangeet')}</span>
            <Countdown targetDate="2026-12-12T10:00:00" />
          </div>
        </div>
      </section>
    </div>
  );
}
