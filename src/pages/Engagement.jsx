import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Heart, ArrowLeft, Shirt, Sparkles } from 'lucide-react';
import Countdown from '../components/Countdown';
import { useLanguage } from '../context/LanguageContext';

export default function Engagement() {
  const { t } = useLanguage();
  
  // You can easily update the date and location details below:
  const engagementDateString = "2026-09-20T10:00:00"; // Date format: YYYY-MM-DDTHH:MM:SS
  const engagementDateFormatted = t("September 20th, 2026");
  const engagementLocation = t("Atmosphere, Mysuru");

  return (
    <div className="engagement-page animate-fade-in">
      <section className="section page-header-section" style={{ paddingBottom: '20px' }}>
        <div className="container text-center">
          <Link to="/" className="btn-secondary" style={{ marginBottom: '24px', display: 'inline-flex', padding: '8px 16px', letterSpacing: '1px', textTransform: 'none' }}>
            <ArrowLeft size={16} style={{ marginRight: '8px' }} />
            {t('Back to Welcome')}
          </Link>
          <h1 className="page-title" style={{ fontSize: '3rem', marginBottom: '8px' }}>{t('The Engagement Ceremony')}</h1>
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

      <section className="engagement-countdown-section" style={{ padding: '20px 0' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <div className="glass-panel text-center countdown-wrap-card">
            <span className="hero-eyebrow" style={{ display: 'block', marginBottom: '12px' }}>{t('Countdown to the Engagement')}</span>
            <Countdown targetDate={engagementDateString} />
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
                  <span className="schedule-time" style={{ fontWeight: '600', color: 'var(--text-accent)', minWidth: '80px' }}>10:00 AM</span>
                  <div className="schedule-info">
                    <h4 style={{ fontFamily: 'var(--font-sans)', fontWeight: '600' }}>{t('Ring Ceremony & Exchange of Vows')}</h4>
                    <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>{t('The couple will exchange rings in the presence of family and friends.')}</p>
                  </div>
                </div>
                <div className="schedule-item" style={{ display: 'flex', gap: '16px' }}>
                  <span className="schedule-time" style={{ fontWeight: '600', color: 'var(--text-accent)', minWidth: '80px' }}>12:00 PM</span>
                  <div className="schedule-info">
                    <h4 style={{ fontFamily: 'var(--font-sans)', fontWeight: '600' }}>{t('Lunch & Celebrations')}</h4>
                    <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>{t('Join us for an elegant Afternoon of Lunch, music, and joy.')}</p>
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
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '8px' }}>{engagementLocation}</h3>
                <p className="venue-address" style={{ fontWeight: '500', color: 'var(--text-accent)', marginBottom: '16px' }}>{engagementDateFormatted}</p>
                <p className="venue-desc" style={{ color: 'var(--text-secondary)' }}>
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

            {/* Dress Code */}
            <div className="details-card glass-panel">
              <div className="details-card-header" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <Shirt className="details-header-icon" size={24} style={{ color: 'var(--text-gold)' }} />
                <h2>{t('Dress Code')}</h2>
              </div>
              <div className="venue-info">
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '8px' }}>{t('Festive Pastel Wear')}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  {t('We would love for you to celebrate with us in elegant pastel traditional or semi-formal attire. Lightweight, breathable fabrics are recommended!')}
                </p>
                <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--text-gold)', fontWeight: '600' }}>
                  {t('Color Ideas: Lavender, peach, soft mint green, powder blue, and champagne gold.')}
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
                  <span className="schedule-time" style={{ fontWeight: '600', color: 'var(--text-accent)', minWidth: '70px' }}>10:30 AM</span>
                  <div className="schedule-info">
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '600' }}>{t('Guest Arrival & Welcoming')}</h4>
                  </div>
                </div>
                <div className="schedule-item" style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                  <span className="schedule-time" style={{ fontWeight: '600', color: 'var(--text-accent)', minWidth: '70px' }}>11:00 AM</span>
                  <div className="schedule-info">
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '600' }}>{t('Ring Ceremony & Exchange of Vows')}</h4>
                  </div>
                </div>
                <div className="schedule-item" style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                  <span className="schedule-time" style={{ fontWeight: '600', color: 'var(--text-accent)', minWidth: '70px' }}>11:45 AM</span>
                  <div className="schedule-info">
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '600' }}>{t('Cake Cutting & Stage Photography')}</h4>
                  </div>
                </div>
                <div className="schedule-item" style={{ display: 'flex', gap: '16px' }}>
                  <span className="schedule-time" style={{ fontWeight: '600', color: 'var(--text-accent)', minWidth: '70px' }}>12:30 PM</span>
                  <div className="schedule-info">
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '600' }}>{t('Buffet Lunch & Congratulations')}</h4>
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
