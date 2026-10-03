// Small inline icons + the logo mark (placeholder until the official SMASHED logo is supplied).
export function LogoMark({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" className="logo-svg">
      <circle cx="20" cy="20" r="20" fill="var(--accent-deep)" />
      <path d="M9.5 18.5C9.5 12.6 14.2 9 20 9s10.5 3.6 10.5 9.5z" fill="var(--accent-deep-foreground)" />
      <circle cx="15.5" cy="14.5" r=".9" fill="var(--accent-deep)" /><circle cx="20" cy="12.6" r=".9" fill="var(--accent-deep)" /><circle cx="24.5" cy="14.5" r=".9" fill="var(--accent-deep)" />
      <rect x="9.5" y="20.2" width="21" height="4.2" rx="2.1" fill="#171717" />
      <path d="M9.5 26.2h21c0 3-2.6 5-5.6 5H15.1c-3 0-5.6-2-5.6-5z" fill="var(--accent-deep-foreground)" />
    </svg>
  );
}
export const SearchIcon = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true" {...p}>
    <circle cx="11" cy="11" r="6.5" /><path d="m20 20-4-4" />
  </svg>
);
export const Flame = (p) => (
  <svg width="11" height="13" viewBox="0 0 20 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M10 0c1 4 6 6 6 12.5A6.3 6.3 0 0 1 10 19a6.3 6.3 0 0 1-6-6.5c0-2.2 1-3.6 2.2-4.8.2 1.6.9 2.5 1.8 3C8 8 8.4 3.4 10 0z" transform="translate(0 2.5)" />
  </svg>
);
export const TrashIcon = (p) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
  </svg>
);
