import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext();

// Helper to decode HTML entities returned by translation APIs
function decodeHtmlEntities(str) {
  if (!str) return '';
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('wedding_language') || '';
  });

  const [showPrompt, setShowPrompt] = useState(false);

  // Loaded from localStorage to cache dynamically translated strings
  const [translationCache, setTranslationCache] = useState(() => {
    const saved = localStorage.getItem('wedding_translation_cache');
    return saved ? JSON.parse(saved) : {};
  });

  // Track pending translation calls in progress to avoid duplicate requests
  const pendingRequests = useRef(new Set());

  useEffect(() => {
    // If no language is selected yet, show the language selection modal prompt
    if (!language) {
      setShowPrompt(true);
    }
  }, [language]);

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('wedding_language', lang);
    setShowPrompt(false);
  };

  const triggerTranslation = async (text) => {
    if (pendingRequests.current.has(text)) return;
    pendingRequests.current.add(text);

    // Try MyMemory first (registered with contact email for 50k chars/day limit)
    try {
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|kn&de=wedding.invitation.app@gmail.com`);
      if (res.ok) {
        const data = await res.json();
        const rawTranslated = data?.responseData?.translatedText;
        if (
          rawTranslated &&
          data?.responseStatus === 200 &&
          !rawTranslated.toUpperCase().includes("LIMIT EXCEEDED") &&
          !rawTranslated.toUpperCase().includes("IS EXCEEDED") &&
          rawTranslated !== text
        ) {
          const translatedText = decodeHtmlEntities(rawTranslated);
          setTranslationCache(prev => {
            const updated = { ...prev, [text]: translatedText };
            localStorage.setItem('wedding_translation_cache', JSON.stringify(updated));
            return updated;
          });
          pendingRequests.current.delete(text);
          return;
        }
      }
    } catch (err) {
      console.warn("MyMemory API failed for:", text, err);
    }

    // Try Argos/LibreTranslate mirror POST as fallback
    try {
      const res = await fetch("https://translate.argosopentech.com/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: text,
          source: "en",
          target: "kn",
          format: "text"
        })
      });
      if (res.ok) {
        const data = await res.json();
        const rawTranslated = data?.translatedText;
        if (rawTranslated && rawTranslated !== text) {
          const translatedText = decodeHtmlEntities(rawTranslated);
          setTranslationCache(prev => {
            const updated = { ...prev, [text]: translatedText };
            localStorage.setItem('wedding_translation_cache', JSON.stringify(updated));
            return updated;
          });
          pendingRequests.current.delete(text);
          return;
        }
      }
    } catch (err) {
      console.warn("Fallback Argos Translate mirror failed for:", text, err);
    }

    pendingRequests.current.delete(text);
  };

  const t = (text) => {
    if (!text) return '';
    if (!language || language === 'en') return text;

    // 1. Check if the English string is statically predefined in translations.js
    if (translations.kn && translations.kn[text]) {
      return translations.kn[text];
    }

    // 2. Check if the English string is cached in localStorage
    if (translationCache[text]) {
      return translationCache[text];
    }

    // 3. Fallback: Trigger background translation and return English string temporarily
    triggerTranslation(text);
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
      {showPrompt && (
        <div className="modal-overlay" style={{ zIndex: 9999 }}>
          <div className="modal-content-wrap glass-panel text-center animate-fade-in-scale" style={{ padding: '40px', maxWidth: '450px', width: '90%', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '8px', color: 'var(--text-accent)' }}>ಕನ್ನಡ / English</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: '1.5' }}>
              ದಯವಿಟ್ಟು ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ<br />
              Please select your preferred language
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button 
                className="btn-primary" 
                onClick={() => setLanguage('kn')}
                style={{ width: '100%', padding: '14px', fontSize: '1rem', letterSpacing: '1px', textTransform: 'none' }}
              >
                ಕನ್ನಡ (Kannada)
              </button>
              <button 
                className="btn-secondary" 
                onClick={() => setLanguage('en')}
                style={{ width: '100%', padding: '14px', fontSize: '1rem', letterSpacing: '1px', textTransform: 'none' }}
              >
                English
              </button>
            </div>
          </div>
        </div>
      )}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
