// PhotoTile — top of every menu card.
// If the item has a real photo, render it with an overlay + metadata chips.
// Otherwise, render a designed gradient poster tile with the dish name.

export default function PhotoTile({ item, num }) {
  const cornerText = `${item.category} · ${num ? `Nº ${num}` : ""}`.trim();
  let badge = null;
  if (item.signature) {
    badge = (
      <span className="absolute top-3.5 right-3.5 text-[0.6rem] uppercase tracking-widest bg-[color:var(--accent)] text-[color:var(--accent-foreground)] px-3 py-1 rounded-full font-bold z-10 shadow-lg shadow-[color:var(--accent)]/40">
        Signature
      </span>
    );
  } else if (item.bestseller) {
    badge = (
      <span className="absolute top-3.5 right-3.5 text-[0.6rem] uppercase tracking-widest text-[color:var(--accent-text)] px-3 py-1 rounded-full font-bold z-10 border border-[color:var(--accent)]/40 backdrop-blur"
        style={{ background: "rgba(20,16,12,0.85)" }}
      >
        ★ Bestseller
      </span>
    );
  }
  const cornerEl = (
    <div className="absolute top-3.5 left-3.5 font-display text-[0.6rem] uppercase tracking-widest text-white/85 font-semibold z-10 [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]">
      {cornerText}
    </div>
  );

  if (item.img) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden bg-[color:var(--base)] group/tile">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.img}
          alt={item.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(20,16,12,0.35)_0%,transparent_40%,transparent_55%,rgba(20,16,12,0.55)_100%)]" />
        {cornerEl}
        {badge}
      </div>
    );
  }

  const tileClass = tileClasses[item.tile] || "bg-gradient-to-br from-[#2b1508] via-[#F58220] to-[#14100c]";
  return (
    <div className={`relative aspect-[4/3] overflow-hidden ${tileClass}`}>
      {cornerEl}
      {badge}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-[2]">
        <div className="font-display font-bold tracking-tight text-white/95 text-[clamp(1.5rem,3.5vw,2.5rem)] leading-[0.92] [text-shadow:0_4px_24px_rgba(0,0,0,0.5)]">
          {item.short}
        </div>
        <div className="mt-2 text-[0.7rem] uppercase tracking-widest text-white/60 font-semibold">
          {item.stack || item.category}
        </div>
      </div>
    </div>
  );
}

const tileClasses = {
  "tile-fries-plain": "bg-gradient-to-br from-[#6b4a15] via-[#b8801a] to-[#2a1c08]",
  "tile-fries-masala": "bg-gradient-to-br from-[#6b2a0a] via-[#b85820] to-[#2a1006]",
  "tile-fries-loaded": "bg-gradient-to-br from-[#5a1808] via-[#a03818] to-[#1e0805]",
  "tile-onion": "bg-gradient-to-br from-[#5a3510] via-[#a06a1a] to-[#1e1205]",
  "tile-mozz-sticks": "bg-gradient-to-br from-[#6b4a10] via-[#c48a1a] to-[#2a1c06]",
  "tile-tenders": "bg-gradient-to-br from-[#5a3810] via-[#a06a1a] to-[#1e1408]",
  "tile-deal": "bg-gradient-to-br from-[#2b1508] via-[#F58220] to-[#14100c]",
};
