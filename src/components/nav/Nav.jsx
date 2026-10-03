"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/story", label: "Story" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/locations", label: "Locations" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <div
          className={`pointer-events-auto flex items-center gap-1.5 pl-5 pr-2 py-2 rounded-full border transition-all duration-300 max-w-full`}
          style={{
            background: "var(--nav-bg)",
            borderColor: "var(--nav-border)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            boxShadow: scrolled
              ? "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,130,32,0.08) inset, inset 0 1px 0 rgba(255,255,255,0.06)"
              : "0 20px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(245,130,32,0.04) inset, inset 0 1px 0 rgba(255,255,255,0.05)",
            transform: scrolled ? "scale(0.98)" : "scale(1)",
          }}
        >
          <Link href="/" className="flex items-center gap-2.5 pr-1 font-display font-bold tracking-tight text-base">
            <BrandMark />
            SMASHED
          </Link>
          <span className="w-px h-5 bg-[color:var(--border)] mx-1.5 hidden md:block" />

          <nav className="hidden md:flex items-center gap-0.5">
            {LINKS.map((l) => {
              const active = pathname === l.href;
              return <NavLink key={l.href} href={l.href} label={l.label} active={active} />;
            })}
          </nav>

          <ThemeToggle />

          <Link
            href="/menu"
            className="hidden md:inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-bold bg-[color:var(--accent)] text-[color:var(--accent-foreground)] hover:bg-[color:var(--accent-deep)] hover:text-[color:var(--foreground)] hover:-translate-y-0.5 transition-all shadow-lg shadow-[color:var(--accent)]/25 ml-1"
          >
            Order now
            <span aria-hidden>→</span>
          </Link>

          <button
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden w-10 h-10 rounded-full border border-[color:var(--border)] grid place-items-center hover:border-[color:var(--accent-deep)] transition-colors"
          >
            <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="4" y1="7" x2="16" y2="7" />
              <line x1="4" y1="13" x2="16" y2="13" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed top-[84px] left-4 right-4 z-50 rounded-3xl border border-[color:var(--border)] p-3 flex flex-col gap-1 shadow-2xl shadow-black/50 md:hidden"
          style={{
            background: "var(--nav-bg-solid)",
            backdropFilter: "blur(24px) saturate(180%)",
          }}
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-5 py-3.5 rounded-2xl text-sm font-bold text-[color:var(--foreground)]/85 hover:bg-[color:var(--surface)] hover:text-[color:var(--foreground)] transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/menu"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full px-5 py-3 text-center text-sm font-bold bg-[color:var(--accent)] text-[color:var(--accent-foreground)]"
          >
            Order now →
          </Link>
        </div>
      )}
    </>
  );
}

/**
 * NavLink — bold text, backlit radial glow behind on hover.
 * The glow is a pseudo-element with a blurred radial gradient that
 * fades and scales in.
 */
function NavLink({ href, label, active }) {
  return (
    <Link
      href={href}
      className={`nav-link relative px-4 py-2.5 rounded-full text-[0.85rem] font-bold tracking-tight transition-colors z-[1] ${
        active ? "text-[color:var(--foreground)]" : "text-[color:var(--foreground)]/70 hover:text-[color:var(--foreground)]"
      }`}
    >
      <span className="relative z-10">{label}</span>
      <style jsx>{`
        .nav-link::before {
          content: "";
          position: absolute;
          inset: -14px;
          background: radial-gradient(circle at center,
            rgba(245, 130, 32, 0.55) 0%,
            rgba(245, 130, 32, 0.18) 40%,
            transparent 70%);
          border-radius: 50%;
          opacity: 0;
          transform: scale(0.7);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
          filter: blur(14px);
          pointer-events: none;
        }
        .nav-link:hover::before {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>
      {active && (
        <span
          aria-hidden
          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[color:var(--accent)] shadow-[0_0_8px_rgba(245,130,32,0.6)]"
        />
      )}
    </Link>
  );
}

function BrandMark() {
  return (
    <span className="w-7 h-7 grid place-items-center rounded-full shadow-lg shadow-[color:var(--accent)]/30"
      style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-deep))" }}
    >
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
        <path d="M6 14 Q12 8 18 14" stroke="#14100c" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="9" cy="12" r="1" fill="#14100c" />
        <circle cx="15" cy="12" r="1" fill="#14100c" />
      </svg>
    </span>
  );
}
