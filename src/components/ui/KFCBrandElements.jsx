import React from 'react';

export const KFCLogo = ({ className = "h-8 w-auto", variant = "white" }) => {
  const textColor = variant === "red" ? "#E4002B" : "#FFFFFF";
  const stripeColor = variant === "red" ? "#1A1A1A" : "#FFFFFF";
  
  return (
    <svg className={className} viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 3 Iconic Red/White Stripes Container */}
      <rect x="0" y="4" width="12" height="42" rx="2" fill="#E4002B" />
      <rect x="16" y="4" width="12" height="42" rx="2" fill={stripeColor} opacity="0.9" />
      <rect x="32" y="4" width="12" height="42" rx="2" fill="#E4002B" />
      
      {/* KFC Bold Typography */}
      <text
        x="54"
        y="38"
        fontFamily="'Montserrat', 'Impact', sans-serif"
        fontSize="34"
        fontWeight="900"
        letterSpacing="2"
        fill={textColor}
      >
        KFC
      </text>
    </svg>
  );
};

export const REDLogo = ({ className = "h-9 w-auto", glowing = false }) => {
  return (
    <div className={`inline-flex items-center gap-2 ${glowing ? 'animate-glow' : ''}`}>
      <svg className={className} viewBox="0 0 180 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E4002B" />
            <stop offset="100%" stopColor="#E4002B" />
          </linearGradient>
          <filter id="redGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Emblem hexagon container */}
        <rect x="2" y="5" width="40" height="40" rx="8" fill="url(#redGradient)" filter="url(#redGlow)" />
        <path d="M12 25 L22 15 L32 25 L22 35 Z" fill="white" opacity="0.95" />
        <circle cx="22" cy="25" r="4" fill="#E4002B" />

        {/* Text */}
        <text
          x="50"
          y="35"
          fontFamily="'Montserrat', sans-serif"
          fontSize="28"
          fontWeight="900"
          letterSpacing="3"
          fill="#FFFFFF"
        >
          R.E.D.
        </text>
      </svg>
    </div>
  );
};

export const ColonelBowtie = ({ className = "h-4 w-auto", color = "#E4002B" }) => {
  return (
    <svg className={className} viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="10" r="3.5" fill={color} />
      <path d="M17 10 L4 4 V16 Z" fill={color} />
      <path d="M23 10 L36 4 V16 Z" fill={color} />
      <path d="M18 13 L12 20 H15 L19.5 14.5 Z" fill={color} opacity="0.8" />
      <path d="M22 13 L28 20 H25 L20.5 14.5 Z" fill={color} opacity="0.8" />
    </svg>
  );
};
