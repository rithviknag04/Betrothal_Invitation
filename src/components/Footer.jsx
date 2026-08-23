import React from 'react';
import { Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="botanical-divider">
          <div className="botanical-line"></div>
          <div className="botanical-icon">
            <Heart size={16} fill="currentColor" />
          </div>
          <div className="botanical-line"></div>
        </div>
        <p className="footer-title" style={{ whiteSpace: 'pre-line', lineHeight: '1.8', marginBottom: '16px' }}>
          {t("Nag family expects you all to be part of all Wedding rituals of\nPrajwala Nag & Shravan Kumar\nheld on 13th & 14th December 2026.")}
        </p>
        <p className="footer-copyright">
          {t("This invitation is made with love by Rithvik Nag")}
        </p>
      </div>
    </footer>
  );
}
