import React, { useState, useEffect, useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Countdown({ targetDate }) {
  const { t } = useLanguage();
  
  // Parse the target date only once
  const parsedTargetDate = useMemo(() => {
    if (targetDate instanceof Date) return targetDate;

    if (typeof targetDate !== "string") {
      return new Date(targetDate);
    }

    // Parse YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss as LOCAL time
    const match = targetDate.match(
      /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2}))?)?$/
    );

    if (match) {
      const [
        ,
        year,
        month,
        day,
        hours = "0",
        minutes = "0",
        seconds = "0",
      ] = match;

      return new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hours),
        Number(minutes),
        Number(seconds)
      );
    }

    // Fallback
    return new Date(targetDate);
  }, [targetDate]);

  const calculateTimeLeft = () => {
    const difference = parsedTargetDate.getTime() - Date.now();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const totalSeconds = Math.floor(difference / 1000);

    return {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    };
  };

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  useEffect(() => {
    let timeoutId;

    const update = () => {
      const newTime = calculateTimeLeft();
      setTimeLeft(newTime);

      // Stop once countdown finishes
      if (
        newTime.days === 0 &&
        newTime.hours === 0 &&
        newTime.minutes === 0 &&
        newTime.seconds === 0
      ) {
        return;
      }

      // Schedule next update exactly on the next second
      const delay = 1000 - (Date.now() % 1000);
      timeoutId = setTimeout(update, delay);
    };

    update();

    return () => clearTimeout(timeoutId);
  }, [parsedTargetDate]);

  const pad = (num) => String(num).padStart(2, "0");

  return (
    <div className="countdown-container animate-fade-in">
      <div className="countdown-grid">
        <div className="countdown-card glass-card">
          <span className="countdown-number">{pad(timeLeft.days)}</span>
          <span className="countdown-label">{t('Days')}</span>
        </div>

        <div className="countdown-card glass-card">
          <span className="countdown-number">{pad(timeLeft.hours)}</span>
          <span className="countdown-label">{t('Hours')}</span>
        </div>

        <div className="countdown-card glass-card">
          <span className="countdown-number">{pad(timeLeft.minutes)}</span>
          <span className="countdown-label">{t('Mins')}</span>
        </div>

        <div className="countdown-card glass-card">
          <span className="countdown-number">{pad(timeLeft.seconds)}</span>
          <span className="countdown-label">{t('Secs')}</span>
        </div>
      </div>
    </div>
  );
}