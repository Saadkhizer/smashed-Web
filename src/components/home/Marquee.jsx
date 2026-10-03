// Marquee strip — the calling-cards of the brand. Not a slider, not decoration:
// it's the one always-moving element, so the page never feels flat.
const WORDS = [
  "Cast-iron chargrilled",
  "Double up · 10% off",
  "Fresh, never frozen",
  "Hand-smashed daily",
  "Bahria Enclave, Sector A",
  "Open till late",
  "Rated 4.9 on foodpanda",
];

export default function Marquee() {
  return (
    <section className="relative py-6 md:py-8 border-y border-[color:var(--border)] bg-[color:var(--surface)] overflow-hidden">
      <div className="flex marquee-track whitespace-nowrap gap-14 will-change-transform">
        {[...WORDS, ...WORDS].map((w, i) => (
          <span key={i} className="flex items-center gap-14 text-lg md:text-xl font-display tracking-tight text-[color:var(--foreground)]/85">
            <span className="inline-block w-2 h-2 rounded-full bg-[color:var(--accent)]" />
            {w}
          </span>
        ))}
      </div>
    </section>
  );
}
