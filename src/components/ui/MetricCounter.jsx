import React, { useState, useEffect } from 'react';

export const MetricCounter = ({ value, label, sublabel, highlight, isVisible = true }) => {
  const [displayValue, setDisplayValue] = useState(value);

  // For numeric values, we can parse prefix and suffix
  useEffect(() => {
    if (!isVisible) return;
    
    // Check if value contains numbers
    const numMatch = value.match(/[\d,]+/);
    if (!numMatch) {
      setDisplayValue(value);
      return;
    }

    const rawStr = numMatch[0].replace(/,/g, '');
    const targetNum = parseInt(rawStr, 10);
    const prefix = value.startsWith('+') ? '+' : '';
    const suffix = value.endsWith('%') ? '%' : '';

    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (targetNum - start) * ease);

      const formatted = targetNum > 999 
        ? current.toLocaleString() 
        : current.toString();

      setDisplayValue(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(update);
  }, [value, isVisible]);

  return (
    <div className="flex flex-col">
      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-heading">
        <span className="text-kfc-red drop-shadow-[0_0_15px_rgba(228,0,43,0.4)]">{displayValue}</span>
      </div>
      <div className="text-sm md:text-base font-bold text-white mt-1 uppercase tracking-wide">
        {label}
      </div>
      {(sublabel || highlight) && (
        <div className="text-xs md:text-sm text-gray-400 font-medium mt-0.5">
          {highlight || sublabel}
        </div>
      )}
    </div>
  );
};
