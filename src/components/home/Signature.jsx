import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import Reveal from "@/components/motion/Reveal";
import PhotoTile from "@/components/ui/PhotoTile";
import { MENU } from "@/lib/menu";

const SIG_IDS = ["og-smashed", "fiery", "smokey-bbq"];
const SIGNATURE = SIG_IDS.map((id) => MENU.find((m) => m.id === id)).filter(Boolean);

export default function Signature() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid md:grid-cols-[auto_1fr] items-end gap-6 md:gap-16 mb-14">
          <div>
            <p className="eyebrow">The line-up</p>
            <h2 className="display mt-4 text-[clamp(2rem,5vw,3.75rem)] max-w-2xl">
              The three we&rsquo;re<br />
              <span className="text-[color:var(--accent)]">known for.</span>
            </h2>
          </div>
          <p className="text-[color:var(--muted)] max-w-md md:justify-self-end md:text-right">
            Every burger on the menu has fans. These three have addicts.
          </p>
        </div>

        <Stagger className="grid gap-6 md:gap-8 md:grid-cols-3">
          {SIGNATURE.map((item, i) => (
            <StaggerItem key={item.id}>
              <SignatureCard item={item} num={String(i + 1).padStart(2, "0")} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2} className="mt-12 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-[color:var(--accent-text)] font-semibold hover:text-[color:var(--accent)] transition-colors"
          >
            See the whole menu →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function SignatureCard({ item, num }) {
  return (
    <article className="group relative rounded-[28px] border border-[color:var(--border)] bg-[color:var(--surface)] overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:border-[color:var(--accent)]/30">
      <PhotoTile item={item} num={num} />
      <div className="p-6 md:p-7 relative">
        <div className="flex items-center justify-between">
          <span className="eyebrow">{item.category}</span>
          <HeatDots heat={item.heat || 0} />
        </div>
        <h3 className="font-display font-bold text-2xl md:text-2xl mt-2.5 tracking-tight">{item.name}</h3>
        <p className="text-[color:var(--muted)] text-sm mt-2 leading-relaxed">{item.tagline}</p>

        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[color:var(--muted)] font-semibold">From</p>
            <p className="font-display font-bold text-2xl">Rs. {item.price.toLocaleString()}</p>
          </div>
          <span className="w-11 h-11 rounded-full grid place-items-center bg-[color:var(--accent)] text-[color:var(--accent-foreground)] font-bold text-xl group-hover:rotate-[20deg] group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[color:var(--accent)]/25">
            +
          </span>
        </div>
      </div>
    </article>
  );
}

function HeatDots({ heat }) {
  return (
    <div className="flex gap-1" title={`Heat: ${heat}/3`}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${i < heat ? "bg-[color:var(--accent)] shadow-[0_0_4px_rgba(245,130,32,0.6)]" : "bg-[color:var(--border)]"}`}
        />
      ))}
    </div>
  );
}
