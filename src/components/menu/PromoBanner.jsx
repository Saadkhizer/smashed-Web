// "Double Up · 10% off" — real live promo from foodpanda, sits at the top of the menu
export default function PromoBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl p-8 md:p-10 mb-10 flex flex-wrap items-center justify-between gap-6 border border-[color:var(--accent)]/35 shadow-2xl shadow-[color:var(--accent)]/15"
      style={{
        background: "linear-gradient(135deg, #2a1808 0%, #F58220 200%)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4) 1px, transparent 2px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative">
        <p className="font-display text-[0.65rem] tracking-[0.28em] uppercase text-[color:var(--accent-text)] font-bold mb-1.5">
          On now · Auto-applied
        </p>
        <p className="font-display font-bold text-xl md:text-2xl tracking-tight">
          Double up. Same burger, twice the patty.
        </p>
        <p className="mt-1.5 text-[color:var(--foreground)]/75 text-sm max-w-lg">
          Every burger is available as a Double — and every Double is 10% off, on the house.
        </p>
      </div>
      <div className="relative flex-shrink-0 font-display font-bold text-2xl px-6 py-3 bg-[color:var(--accent)] text-[color:var(--accent-foreground)] rounded-full shadow-xl shadow-[color:var(--accent)]/35">
        10% OFF
      </div>
    </div>
  );
}
