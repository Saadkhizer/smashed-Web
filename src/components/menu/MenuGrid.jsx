"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CATEGORIES, MENU } from "@/lib/menu";
import PhotoTile from "@/components/ui/PhotoTile";

export default function MenuGrid() {
  const [active, setActive] = useState("beef");
  const items = useMemo(() => MENU.filter((m) => m.category === active), [active]);

  return (
    <div>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 md:gap-3 mb-10">
        {CATEGORIES.map((c) => {
          const on = c.id === active;
          return (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              aria-pressed={on}
              className={`relative px-5 py-2.5 rounded-full text-sm font-bold transition-colors ${
                on
                  ? "text-[color:var(--accent-foreground)]"
                  : "text-[color:var(--foreground)]/75 border border-[color:var(--border)] hover:border-[color:var(--accent-deep)]"
              }`}
            >
              {on && (
                <motion.span
                  layoutId="pill-bg"
                  className="absolute inset-0 rounded-full bg-[color:var(--accent)] shadow-lg shadow-[color:var(--accent)]/25"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{c.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-5 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => (
            <motion.article
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-[28px] border border-[color:var(--border)] bg-[color:var(--surface)] overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:border-[color:var(--accent)]/30"
            >
              <PhotoTile item={item} num={String(i + 1).padStart(2, "0")} />

              <div className="p-6 relative">
                <div className="flex items-start justify-between gap-3">
                  <span className="eyebrow">{item.category}</span>
                  {typeof item.heat === "number" && item.heat > 0 && (
                    <HeatIndicator heat={item.heat} />
                  )}
                </div>
                <h3 className="font-display font-bold text-xl tracking-tight mt-2">{item.name}</h3>
                {item.tagline && (
                  <p className="mt-2 text-sm text-[color:var(--muted)] leading-relaxed">{item.tagline}</p>
                )}
                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[color:var(--muted)] font-semibold">From</p>
                    <p className="font-display font-bold text-2xl">Rs. {item.price.toLocaleString()}</p>
                  </div>
                  <span className="w-10 h-10 rounded-full grid place-items-center bg-[color:var(--accent)] text-[color:var(--accent-foreground)] font-bold text-lg group-hover:rotate-[20deg] group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[color:var(--accent)]/25">
                    +
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function HeatIndicator({ heat }) {
  const label = ["mild", "medium", "hot", "fire"][heat] || "";
  return (
    <div className="inline-flex items-center gap-2 text-xs text-[color:var(--muted)] uppercase tracking-widest font-semibold">
      <span className="flex gap-0.5">
        {[0, 1, 2].map((i) => (
          <svg key={i} viewBox="0 0 12 16" width="10" height="14" className={i < heat ? "text-[color:var(--accent)]" : "text-[color:var(--border)]"}>
            <path d="M6 0 C 2 4 0 7 0 10 A6 6 0 0 0 12 10 C 12 6 8 3 6 0Z" fill="currentColor" />
          </svg>
        ))}
      </span>
      {label}
    </div>
  );
}
