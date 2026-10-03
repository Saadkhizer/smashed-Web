import Reveal from "@/components/motion/Reveal";
import CurveDivider from "@/components/ui/CurveDivider";

export default function StoryStrip() {
  return (
    <>
      <CurveDivider fill="var(--surface)" />

      <section className="relative bg-[color:var(--surface)] py-24 md:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid md:grid-cols-2 gap-14 md:gap-24 items-center">
          <Reveal>
            <div className="relative">
              <div className="aspect-[4/5] rounded-[28px] overflow-hidden bg-[color:var(--base)] border border-[color:var(--accent)]/12 relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/fiery-alt.jpg"
                  alt="SMASHED cheese burger, kitchen shot"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[6000ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(20,16,12,0.3)_0%,transparent_40%,rgba(20,16,12,0.85)_100%)]" />
                <div className="absolute inset-0 z-[2] flex flex-col justify-between p-7">
                  <div className="flex justify-between font-display text-[0.65rem] font-semibold tracking-[0.28em] uppercase text-white/85 [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]">
                    <span>The kitchen · Nº 02</span>
                    <span>2021 →</span>
                  </div>
                  <div className="font-display font-bold tracking-tight text-[clamp(1.75rem,5vw,2.75rem)] leading-[0.95] [text-shadow:0_4px_20px_rgba(0,0,0,0.6)]">
                    Cast-iron.<br />
                    <span className="text-[color:var(--accent)]">Never off.</span>
                  </div>
                </div>
              </div>
              {/* Mobile: flows in normal document order (just pulled up to
                  overlap the image bottom) so it never covers the headline
                  stacked below it. Desktop: absolute, overlapping the
                  column edge, since there's a sibling column to its right. */}
              <div className="relative -mt-3.5 ml-auto md:mt-0 md:ml-0 md:absolute md:-bottom-6 md:-right-6 lg:-right-10 bg-[color:var(--base)] border border-[color:var(--border)] rounded-[20px] p-5 max-w-[240px] shadow-xl">
                <p className="text-xs uppercase tracking-widest text-[color:var(--accent-text)] font-semibold">On the grill since</p>
                <p className="font-display font-bold text-4xl mt-1">2021</p>
                <p className="text-xs text-[color:var(--muted)] mt-1">One cast-iron, three shifts, no days off.</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="eyebrow">The way we cook</p>
            <h2 className="display mt-4 text-[clamp(2rem,5vw,3.5rem)]">
              We don&rsquo;t grill. <br />
              <span className="text-[color:var(--accent)]">We smash.</span>
            </h2>
            <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
              A traditional patty gets pressed once, then left alone. A smash-style patty
              gets punished the second it hits the plate — flattened wide, edges lace-crisp,
              caramelised in seconds. The result is a burger that tastes like it was cooked
              on purpose, not on autopilot.
            </p>
            <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
              We do this the same way every single time. Two patties, American cheese on
              the ride down, sesame bun, our house pickles. The rest of the menu builds
              from there.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-[color:var(--border)] pt-8">
              <Stat number="60s" label="Cook time" />
              <Stat number="220°C" label="Cast-iron heat" />
              <Stat number="2×" label="Patties, always" />
            </div>
          </Reveal>
        </div>
      </section>

      <CurveDivider fill="var(--base)" flip />
    </>
  );
}

function Stat({ number, label }) {
  return (
    <div>
      <p className="font-display font-bold text-3xl">{number}</p>
      <p className="text-xs uppercase tracking-widest text-[color:var(--muted)] mt-1 font-semibold">{label}</p>
    </div>
  );
}
