export const NetworkIcon = () => (
  <svg width="100" height="100" fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" stroke="url(#grad)" strokeWidth="1.5" />
    <defs>
      <linearGradient id="grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ff007f" />
        <stop offset="0.5" stopColor="#7f00ff" />
        <stop offset="1" stopColor="#00ffe1" />
      </linearGradient>
    </defs>
  </svg>
);

export const PeopleIcon = () => (
  <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor" className="text-muted">
    <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3 -3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zM16 13c-.29 0-.62.02-.97.05C16.16 13.74 18 14.82 18 16.5V19h6v-2.5c0-2.33-4.67-3.5-8-3.5z" />
  </svg>
);

export const ChatboxIcon = () => (
  <svg width="100" height="100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
  </svg>
);
