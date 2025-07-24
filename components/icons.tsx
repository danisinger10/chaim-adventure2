import React from 'react';

export const WandIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 4V2" />
    <path d="M15 10V8" />
    <path d="M12.5 6.5L14 5" />
    <path d="M5.5 14.5L7 13" />
    <path d="M18 13a2 2 0 0 0-2-2h-3.5a2 2 0 0 0-2 2v3.5a2 2 0 0 0 2 2h3.5a2 2 0 0 0 2-2v-3.5Z" />
    <path d="M20 6.5 17 9" />
    <path d="M4 20l10-10" />
  </svg>
);

export const QuillIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={className} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round">
        <path d="M20 12c0-5-4.5-9-9-9s-9 4-9 9c0 2.2.8 4.2 2.2 5.8"/>
        <path d="M18.7 18.7c-1.6-1.6-3.8-2.2-5.7-1.7s-3.2 2.2-3.2 4.2V22"/>
        <path d="M16 22h2"/>
        <path d="M18 22a2 2 0 1 0-4 0h4Z"/>
        <path d="m20 12-2-2"/>
        <path d="M15 13-3.5 2.5"/>
    </svg>
);


export const SwordIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round">
        <path d="M21.7 21.7 13 13"/>
        <path d="m9.5 14.5 5 5"/>
        <path d="M2.3 2.3 11 11"/>
        <path d="M14.5 9.5 9 4"/>
        <path d="m9 14.5-5-5"/>
        <path d="m4 9 5 5"/>
    </svg>
);

export const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="m9 18 6-6-6-6" />
    </svg>
);

export const VolumeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M11 5 6 9H2v6h4l5 4V5Z" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
);