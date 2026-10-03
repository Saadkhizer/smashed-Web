"use client";
import { useEffect, useState } from "react";

/**
 * ThemeToggle — flips a custom `data-mode="light"` attribute on <html>.
 * Deliberately not `data-theme` (avoids colliding with any host-level
 * theme-sync mechanism). The actual initial value is set synchronously by
 * an inline script in layout.js (see AntiFlashThemeScript) so there's no
 * flash of the wrong theme before hydration; this component just keeps
 * state in sync afterwards and handles the click.
 */
export default function ThemeToggle() {
  const [mode, setModeState] = useState("dark");

  useEffect(() => {
    setModeState(document.documentElement.getAttribute("data-mode") === "light" ? "light" : "dark");
  }, []);

  const apply = (next) => {
    if (next === "light") {
      document.documentElement.setAttribute("data-mode", "light");
    } else {
      document.documentElement.removeAttribute("data-mode");
    }
    try {
      localStorage.setItem("smashed-theme", next);
    } catch (e) {
      /* storage may be unavailable — theme just won't persist */
    }
    setModeState(next);
  };

  return (
    <button
      type="button"
      aria-label={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
      onClick={() => apply(mode === "light" ? "dark" : "light")}
      className="grid place-items-center flex-shrink-0 w-10 h-10 rounded-full border border-[color:var(--border)] text-[color:var(--foreground)] hover:bg-[color:var(--surface)] hover:border-[color:var(--accent-deep)] hover:rotate-12 transition-all"
    >
      {mode === "light" ? (
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8l1.8-1.8M18 6l1.8-1.8" />
        </svg>
      )}
    </button>
  );
}
