import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, MapPin, Plus, X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const SYSTEM_EVENTS = [
  {
    date: '2026-12-11',
    title: 'Mehendi Ceremony',
    time: '6:00 PM onwards',
    location: 'Atmosphere, Mysuru',
    desc: 'Henna application, music, and pre-wedding celebration. Click to view on Wedding Timeline.',
    type: 'wedding-pre'
  },
  {
    date: '2026-12-12',
    title: 'Haldi & Sangeet Night',
    time: '10:00 AM (Haldi) & 6:00 PM (Sangeet)',
    location: 'Atmosphere, Mysuru',
    desc: 'Ceremonial Haldi followed by dance performances and dinner. Click to view on Wedding Timeline.',
    type: 'wedding-pre'
  },
  {
    date: '2026-12-13',
    title: 'Wedding Ceremony & Reception',
    time: 'Sacred Muhurtham',
    location: 'Vinayaka Convention, Mysuru',
    desc: 'Sacred Muhurtham rituals followed by reception dinner. Click to view details.',
    type: 'wedding-main'
  },
  {
    date: '2026-12-14',
    title: 'Blessings & Reception Lunch',
    time: '12:30 PM onwards',
    location: 'Vinayaka Convention, Mysuru',
    desc: 'A grand lunch celebrating the newly married couple. Click to view details.',
    type: 'wedding-main'
  },
  {
    date: '2026-09-20',
    title: 'Engagement Ceremony',
    time: '4:30 PM onwards',
    location: 'The Emerald Ballroom, Atmosphere, Mysuru',
    desc: 'Ring exchange ceremony followed by dinner and celebrations. Click to view details.',
    type: 'engagement'
  }
];

const LOCAL_STORAGE_KEY = 'wedding_custom_events';

export default function Calendar() {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  
  // Set default calendar view to December 2026
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1));
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 11, 11));
  const [customEvents, setCustomEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [eventTitle, setEventTitle] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDesc, setEventDesc] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        setCustomEvents(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load custom events', e);
      }
    }
  }, []);

  const saveCustomEvents = (events) => {
    setCustomEvents(events);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
  };

  const monthsList = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(prev => {
      const month = prev.getMonth();
      const year = prev.getFullYear();
      if (month === 0) {
        return new Date(year - 1, 11, 1);
      }
      return new Date(year, month - 1, 1);
    });
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const month = prev.getMonth();
      const year = prev.getFullYear();
      if (month === 11) {
        return new Date(year + 1, 0, 1);
      }
      return new Date(year, month + 1, 1);
    });
  };

  const formatDateString = (year, month, day) => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  const getEventsForDate = (dateStr) => {
    const system = SYSTEM_EVENTS.filter(e => e.date === dateStr).map(evt => {
      if (evt.date === '2026-12-11') {
        return {
          ...evt,
          title: t('Mehendi Ceremony'),
          desc: t('6:00 PM onwards — Henna, music, and celebrations.')
        };
      }
      if (evt.date === '2026-12-12') {
        return {
          ...evt,
          title: t('Haldi & Sangeet Night'),
          desc: t('10:00 AM (Haldi) & 6:00 PM (Sangeet dance performances).')
        };
      }
      if (evt.date === '2026-12-13') {
        return {
          ...evt,
          title: t('Wedding & Reception'),
          desc: t('Sacred Muhurtham rituals followed by reception dinner.')
        };
      }
      if (evt.date === '2026-12-14') {
        return {
          ...evt,
          title: t('Blessings & Reception Lunch'),
          desc: t('Gala lunch gathering to bless the newlywed couple.')
        };
      }
      if (evt.date === '2026-09-20') {
        return {
          ...evt,
          title: t('The Engagement Ceremony'),
          desc: t('The couple will exchange rings in the presence of family and friends.')
        };
      }
      return evt;
    });
    
    const custom = customEvents.filter(e => e.date === dateStr);
    return [...system, ...custom];
  };

  const handleDateClick = (dayObj) => {
    if (!dayObj.isCurrentMonth) return;

    const clickedDate = new Date(dayObj.year, dayObj.month, dayObj.day);
    setSelectedDate(clickedDate);
    setShowAddForm(false);
    setIsModalOpen(true);
  };

  const handleAddEventSubmit = (e) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;

    const dateStr = formatDateString(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );

    const newEvent = {
      date: dateStr,
      title: eventTitle,
      time: eventTime || 'All Day',
      location: eventLocation || 'TBA',
      desc: eventDesc,
      type: 'custom'
    };

    const updated = [...customEvents, newEvent];
    saveCustomEvents(updated);

    // Reset Form & Collapse Form View
    setEventTitle('');
    setEventTime('');
    setEventLocation('');
    setEventDesc('');
    setShowAddForm(false);
  };

  // Generate calendar days
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = getFirstDayOfMonth(year, month);
  const totalDays = getDaysInMonth(year, month);
  const prevTotalDays = getDaysInMonth(year, month - 1);

  const days = [];

  // Previous month trailing cells
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      day: prevTotalDays - i,
      month: month === 0 ? 11 : month - 1,
      year: month === 0 ? year - 1 : year,
      isCurrentMonth: false
    });
  }

  // Current month cells
  for (let i = 1; i <= totalDays; i++) {
    days.push({
      day: i,
      month: month,
      year: year,
      isCurrentMonth: true
    });
  }

  // Next month leading cells
  const totalCells = days.length;
  const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  for (let i = 1; i <= remainingCells; i++) {
    days.push({
      day: i,
      month: month === 11 ? 0 : month + 1,
      year: month === 11 ? year + 1 : year,
      isCurrentMonth: false
    });
  }

  const selectedDateStr = formatDateString(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate()
  );
  const selectedDateEvents = getEventsForDate(selectedDateStr);

  const formatModalHeaderDate = (date) => {
    return date.toLocaleDateString(language === 'kn' ? 'kn-IN' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatMonthTitle = (year, monthIndex) => {
    if (language === 'kn') {
      const kannadaMonths = [
        'ಜನವರಿ', 'ಫೆಬ್ರವರಿ', 'ಮಾರ್ಚ್', 'ಏಪ್ರಿಲ್', 'ಮೇ', 'ಜೂನ್',
        'ಜುಲೈ', 'ಆಗಸ್ಟ್', 'ಸೆಪ್ಟೆಂಬರ್', 'ಅಕ್ಟೋಬರ್', 'ನವೆಂಬರ್', 'ಡಿಸೆಂಬರ್'
      ];
      return `${kannadaMonths[monthIndex]} ${year}`;
    }
    return `${monthsList[monthIndex]} ${year}`;
  };

  return (
    <div className="calendar-page animate-fade-in">
      <section className="section page-header-section" style={{ paddingBottom: '20px' }}>
        <div className="container text-center">
          <h1 className="page-title" style={{ fontSize: '3rem', marginBottom: '8px' }}>{t('Wedding Calendar')}</h1>
          <p className="page-subtitle" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
            {t('Click on highlighted dates to view event details or add your own custom schedule.')}
          </p>
          <div className="botanical-divider">
            <div className="botanical-line"></div>
            <div className="botanical-icon">
              <Heart size={16} fill="currentColor" />
            </div>
            <div className="botanical-line"></div>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ padding: '20px 0 80px' }}>
        <div className="container calendar-page-container">
          
          {/* Expanded Centered Calendar Card */}
          <div className="calendar-card glass-panel">
            <div className="calendar-header-nav">
              <h3 className="calendar-month-title">
                {formatMonthTitle(year, month)}
              </h3>
              <div className="calendar-nav-buttons">
                <button className="calendar-btn" onClick={handlePrevMonth} title={language === 'en' ? 'Previous Month' : 'ಹಿಂದಿನ ತಿಂಗಳು'}>
                  <ChevronLeft size={20} />
                </button>
                <button className="calendar-btn" onClick={handleNextMonth} title={language === 'en' ? 'Next Month' : 'ಮುಂದಿನ ತಿಂಗಳು'}>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="calendar-weekdays-grid">
              <div className="calendar-weekday">{language === 'kn' ? 'ಭಾನು' : 'Su'}</div>
              <div className="calendar-weekday">{language === 'kn' ? 'ಸೋಮ' : 'Mo'}</div>
              <div className="calendar-weekday">{language === 'kn' ? 'ಮಂಗಳ' : 'Tu'}</div>
              <div className="calendar-weekday">{language === 'kn' ? 'ಬುಧ' : 'We'}</div>
              <div className="calendar-weekday">{language === 'kn' ? 'ಗುರು' : 'Th'}</div>
              <div className="calendar-weekday">{language === 'kn' ? 'ಶುಕ್ರ' : 'Fr'}</div>
              <div className="calendar-weekday">{language === 'kn' ? 'ಶನಿ' : 'Sa'}</div>
            </div>

            <div className="calendar-days-grid">
              {days.map((d, index) => {
                const dStr = formatDateString(d.year, d.month, d.day);
                const activeEvents = getEventsForDate(dStr);
                const hasEvents = activeEvents.length > 0;
                
                // Highlight wedding events
                let highlightClass = '';
                if (d.isCurrentMonth && hasEvents) {
                  highlightClass = 'has-event';
                }

                return (
                  <div
                    key={index}
                    className={`calendar-cell ${d.isCurrentMonth ? '' : 'inactive'} ${highlightClass}`}
                    onClick={() => handleDateClick(d)}
                  >
                    <span>{d.day}</span>
                    {d.isCurrentMonth && hasEvents && (
                      <span className="calendar-cell-dot"></span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* Date Details Modal (Pops up when a date is selected) */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content-wrap glass-panel" onClick={(e) => e.stopPropagation()} style={{ padding: '32px', maxWidth: '500px', width: '90%' }}>
            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
              <X size={20} />
            </button>
            
            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '20px' }}>
              <span className="hero-eyebrow" style={{ display: 'block', marginBottom: '4px' }}>{t('Date Details')}</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', margin: 0, color: 'var(--text-accent)' }}>
                {formatModalHeaderDate(selectedDate)}
              </h3>
            </div>

            {/* List of Events */}
            <div style={{ overflowY: 'auto', maxHeight: '250px', marginBottom: '20px', paddingRight: '4px' }}>
              {selectedDateEvents.length > 0 ? (
                selectedDateEvents.map((evt, idx) => (
                  <div key={idx} className="calendar-event-card glass-card" style={{ border: '1px solid var(--border-color)', marginBottom: '12px' }}>
                    <h4 style={{ margin: '0 0 6px', fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                      {evt.title}
                    </h4>
                    <div className="calendar-event-time-loc">
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} />
                        {evt.time}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={12} />
                        {evt.location}
                      </span>
                    </div>
                    {evt.desc && (
                      <p style={{ margin: '0 0 10px', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                        {evt.desc}
                      </p>
                    )}
                    {evt.type && evt.type !== 'custom' && (
                      <button
                        className="btn-primary"
                        onClick={() => {
                          setIsModalOpen(false);
                          if (evt.type === 'wedding-pre') {
                            if (evt.date === '2026-12-11') navigate('/mehendi');
                            else navigate('/haldi-sangeet');
                          } else if (evt.type === 'wedding-main') {
                            navigate('/wedding');
                          } else if (evt.type === 'engagement') {
                            navigate('/engagement');
                          }
                        }}
                        style={{ padding: '6px 12px', fontSize: '0.75rem', width: '100%', textTransform: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px' }}
                      >
                        {t('View Full Details Page')}
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-secondary)' }}>
                  <CalendarIcon size={32} style={{ opacity: 0.3, marginBottom: '8px' }} />
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>{t('No events scheduled for this date.')}</p>
                </div>
              )}
            </div>

            {/* Expandable Add Custom Event Form */}
            {!showAddForm ? (
              <button
                className="btn-primary"
                onClick={() => setShowAddForm(true)}
                style={{ width: '100%', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '12px 24px' }}
              >
                <Plus size={16} />
                {t('Add Event')}
              </button>
            ) : (
              <div className="glass-card" style={{ padding: '16px', borderRadius: '12px', border: '1px dashed var(--border-color)' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', marginBottom: '12px', color: 'var(--text-primary)' }}>{t('Add Custom Event')}</h4>
                <form onSubmit={handleAddEventSubmit}>
                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <label className="form-label">{t('Event Name *')}</label>
                    <input
                      type="text"
                      required
                      placeholder={t('e.g. Hotel Check-in, Family Dinner')}
                      className="form-input"
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', width: '100%' }}>
                    <div className="form-group" style={{ marginBottom: 0, flex: 1, minWidth: 0 }}>
                      <label className="form-label">{t('Time')}</label>
                      <input
                        type="text"
                        placeholder={t('e.g. 1:00 PM')}
                        className="form-input"
                        style={{ width: '100%' }}
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0, flex: 1, minWidth: 0 }}>
                      <label className="form-label">{t('Location')}</label>
                      <input
                        type="text"
                        placeholder={t('e.g. Hotel Lobby')}
                        className="form-input"
                        style={{ width: '100%' }}
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <label className="form-label">{t('Notes')}</label>
                    <textarea
                      placeholder={t('Add reminders or flight/room details...')}
                      className="form-textarea"
                      rows="2"
                      value={eventDesc}
                      onChange={(e) => setEventDesc(e.target.value)}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <button type="button" className="btn-secondary" onClick={() => setShowAddForm(false)} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                      {t('Cancel')}
                    </button>
                    <button type="submit" className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                      {t('Save')}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
