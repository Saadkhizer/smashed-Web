import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { TESTIMONIALS } from "@/lib/menu";

export default function Testimonials() {
  return (
    <section id="reviews" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="eyebrow">Word on the street</p>
            <h2 className="display mt-4 text-[clamp(2rem,5vw,3.5rem)]">
              The regulars<br />
              <span className="text-[color:var(--accent)]">said it first.</span>
            </h2>
            <p className="mt-6 text-[color:var(--muted)] max-w-md mx-auto">
              4.9 stars across 100+ reviews on foodpanda. Here&rsquo;s what a few
              of them actually wrote.
            </p>
          </div>
        </Reveal>

        <Stagger className="grid gap-5 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((q, i) => (
            <StaggerItem key={i}>
              <QuoteCard quote={q} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function QuoteCard({ quote }) {
  return (
    <article className="relative rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-7 md:p-8 pt-9 transition-all duration-400 hover:-translate-y-1 hover:border-[color:var(--accent)]/25">
      <span
        aria-hidden
        className="absolute -top-2 left-5 font-display font-bold text-[5rem] leading-none text-[color:var(--accent)] opacity-55"
      >
        &ldquo;
      </span>
      <div className="text-[color:var(--accent)] tracking-[2px] text-sm mb-3" aria-label={`${quote.stars} out of 5 stars`}>
        {"★".repeat(quote.stars)}
        <span className="text-[color:var(--border)]">{"☆".repeat(5 - quote.stars)}</span>
      </div>
      <p className="text-[color:var(--foreground)] leading-relaxed mb-6 text-[0.95rem]">
        {quote.body}
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-[color:var(--border)] font-display">
        <span
          className="w-8 h-8 rounded-full grid place-items-center font-bold text-sm text-[color:var(--accent-foreground)]"
          style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-deep))" }}
        >
          {quote.name[0]}
        </span>
        <div>
          <div className="font-bold text-sm">{quote.name}</div>
          <div className="text-[0.7rem] text-[color:var(--muted)] uppercase tracking-widest">via foodpanda</div>
        </div>
      </div>
    </article>
  );
}
