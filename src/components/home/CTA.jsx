import Link from "next/link";
import CurveDivider from "@/components/ui/CurveDivider";

export default function CTA() {
  return (
    <>
      <CurveDivider fill="var(--accent)" />
      <section className="relative bg-[color:var(--accent)] text-[color:var(--accent-foreground)] py-24 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(0,0,0,0.4) 1px, transparent 2px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 md:px-8 grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <div>
            <p className="eyebrow text-[color:var(--accent-foreground)] opacity-70">Hungry yet?</p>
            <h2 className="display mt-4 text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95]">
              Come in. Take a seat.<br />
              We&rsquo;ll do the rest.
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href="https://www.foodpanda.pk/restaurant/uj5m/smashed-bharia-enclave"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[color:var(--base)] text-[color:var(--foreground)] font-semibold px-7 py-4 text-center hover:bg-[color:var(--surface)] transition-colors"
            >
              Order on foodpanda →
            </a>
            <Link
              href="/menu"
              className="rounded-full border border-[color:var(--accent-foreground)]/40 px-7 py-4 text-center font-semibold hover:bg-[color:var(--accent-foreground)]/10 transition-colors"
            >
              Browse the menu
            </Link>
          </div>
        </div>
      </section>
      <CurveDivider fill="var(--base)" flip />
    </>
  );
}
