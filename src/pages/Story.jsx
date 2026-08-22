import React, { useState } from 'react';
import { Heart, Sparkles, MapPin, Smile } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const storyMilestones = [
  {
    date: 'May 12, 2021',
    title: 'How We Met',
    brideDesc: 'It was a warm summer evening when Shravan walked into the room. He had this quiet confidence and warm smile. We ended up talking for hours, laughing over the silly jokes.',
    groomDesc: 'The moment I saw Prajwala, I was mesmerized. She was laughing and chatting, filling the room with her brightness. I knew immediately I had to find a way to talk to her.',
    icon: <Smile size={20} />,
  },
  {
    date: 'June 18, 2021',
    title: 'Our First Date',
    brideDesc: 'He planned a surprise sunset picnic! He brought my favorite snacks, and we sat under a massive oak tree. It felt so easy and natural, like we had known each other forever.',
    groomDesc: 'I was so nervous planning this surprise picnic. When we sat under the oak tree and started talking, all my worries disappeared. Her smile made the whole setup magical.',
    icon: <MapPin size={20} />,
  },
  {
    date: 'September 24, 2025',
    title: 'The Proposal',
    brideDesc: 'I had no idea what was coming! We walked into this beautiful venue lit up with fairy lights under a canopy of stars. When he got down on one knee, my heart skipped a beat.',
    groomDesc: 'I spent weeks planning the perfect setting under the stars. My hands were shaking when I pulled out the ring. The moment she whispered \'yes\', I was the happiest man alive.',
    icon: <Sparkles size={20} />,
  },
  {
    date: 'December 13, 2026',
    title: 'The Big Day',
    brideDesc: 'Now we are one step away from forever. I cannot wait to hold his hand and walk around the sacred fire, starting our beautiful new beginning together.',
    groomDesc: 'Seeing her walk down the aisle in her wedding attire will be the dream of my life. I am ready to promise her all my love and protect her forever.',
    icon: <Heart size={20} />,
  },
];

export default function Story() {
  const { t } = useLanguage();
  const [activePov, setActivePov] = useState('bride'); // 'bride' or 'groom'

  return (
    <div className="story-page animate-fade-in">
      <section className="section story-hero" style={{ paddingBottom: '10px' }}>
        <div className="container text-center">
          <h1 className="page-title">{t('Our Story')}</h1>
          <p className="page-subtitle">{t('The beautiful journey that led us to this moment')}</p>
          
          <div className="pov-toggle-container">
            <button
              onClick={() => setActivePov('bride')}
              className={`pov-btn ${activePov === 'bride' ? 'active' : ''}`}
            >
              {t("Bride's POV")}
            </button>
            <button
              onClick={() => setActivePov('groom')}
              className={`pov-btn ${activePov === 'groom' ? 'active' : ''}`}
            >
              {t("Groom's POV")}
            </button>
          </div>

          <div className="botanical-divider" style={{ marginTop: '8px' }}>
            <div className="botanical-line"></div>
            <div className="botanical-icon">
              <Heart size={16} fill="currentColor" />
            </div>
            <div className="botanical-line"></div>
          </div>
        </div>
      </section>

      <section className="timeline-section">
        <div className="container">
          <div className="timeline-container">
            <div className="timeline-line"></div>
            
            {storyMilestones.map((milestone, idx) => (
              <div key={idx} className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-dot glass-card">
                  <div className="timeline-dot-icon">{milestone.icon}</div>
                </div>
                
                <div className="timeline-card-wrapper">
                  <div className="timeline-card glass-panel" style={{ transition: 'all 0.3s ease' }}>
                    <span className="timeline-date">{t(milestone.date)}</span>
                    <h3 className="timeline-title">{t(milestone.title)}</h3>
                    <p className="timeline-desc">{t(activePov === 'bride' ? milestone.brideDesc : milestone.groomDesc)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
