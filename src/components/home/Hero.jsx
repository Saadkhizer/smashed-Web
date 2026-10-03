"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import MagneticButton from "@/components/motion/MagneticButton";

export default function Hero() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-28 md:pt-36 pb-20 md:pb-32">
      {/* Ambient bloom — bigger and brighter on desktop so it does the job
          of separating photo from background instead of a hard border */}
      <div className="bloom w-[820px] h-[820px] top-[2%] right-[-220px] hidden md:block" />
      <div className="bloom w-[520px] h-[520px] top-[20%] right-[-80px] md:hidden" />

      <div className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(1200px 600px at 20% 10%, rgba(245,130,32,0.08), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 grid md:grid-cols-[1.05fr_1fr] gap-10 md:gap-6 items-center">
        {/* Left — copy */}
        <div className="relative z-10">
          <motion.p
            className="eyebrow inline-flex items-center gap-3"
            initial={prefersReduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block w-8 h-px bg-[color:var(--accent)]" />
            Since day one · Bahria Enclave
          </motion.p>

          <motion.h1
            className="display mt-5 text-[clamp(2.75rem,7vw,5.5rem)]"
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
          >
            Smashed hard.<br />
            <span className="text-[color:var(--accent)]">Served&nbsp;honest.</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-[color:var(--muted)] max-w-lg text-base md:text-lg leading-relaxed"
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            We take a fresh ball of beef, smack it onto a screaming cast-iron plate,
            and finish it off with cheese that shouldn&rsquo;t be legal. That&rsquo;s the
            whole recipe. Everything else on the menu is us showing off.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <MagneticButton
              onClick={() => (window.location.href = "/menu")}
              className="rounded-full bg-[color:var(--accent)] text-[color:var(--accent-foreground)] font-bold px-7 py-3.5 hover:bg-[color:var(--accent-deep)] hover:text-[color:var(--foreground)] transition-colors shadow-lg shadow-[color:var(--accent)]/25"
            >
              See the menu →
            </MagneticButton>

            <Link
              href="/story"
              className="rounded-full border border-[color:var(--border)] px-6 py-3.5 text-sm font-semibold hover:border-[color:var(--accent-deep)] transition-colors"
            >
              Our story
            </Link>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm"
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <TrustItem number="4.9" label="on foodpanda" />
            <div className="w-px h-8 bg-[color:var(--border)]" />
            <TrustItem number="24h" label="open, mostly" />
            <div className="w-px h-8 bg-[color:var(--border)]" />
            <TrustItem number="100%" label="fresh, never frozen" />
          </motion.div>
        </div>

        {/* Right — real hero photo tile.
            Desktop: bleeds past its column (no hard border) so it reads as
            part of the page, not a floating UI card — the noir-ui rule that
            the hero dish must "break the grid." Mobile keeps it centered
            and contained, since there's no room to bleed meaningfully. */}
        <motion.div
          className="relative md:-mr-8 md:ml-6 md:-my-3"
          initial={prefersReduced ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <div className="relative aspect-square rounded-[32px] overflow-hidden shadow-2xl shadow-black/50 group"
            style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.55), 0 0 90px rgba(245,130,32,0.14)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero.jpg"
              alt="SMASHED double cheeseburger with onion rings"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[8000ms] ease-out group-hover:scale-[1.05]"
            />
            {/* Overlay */}
            <div className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(20,16,12,0.5) 0%, transparent 30%, transparent 55%, rgba(20,16,12,0.85) 100%), radial-gradient(ellipse at 30% 20%, rgba(245,130,32,0.15) 0%, transparent 60%)",
              }}
            />

            {/* Top meta */}
            <div className="absolute top-6 left-6 right-6 flex justify-between z-10 font-display text-[0.7rem] font-semibold tracking-widest uppercase text-white/85 [text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
              <span>Featured · Nº 01</span>
              <span>Bahria Enclave</span>
            </div>

            {/* Bottom caption + price */}
            <div className="absolute bottom-6 left-6 right-6 z-10 flex justify-between items-end gap-4">
              <div className="font-display font-bold tracking-tight text-white text-[clamp(1.1rem,2.5vw,1.5rem)] leading-tight [text-shadow:0_4px_20px_rgba(0,0,0,0.7)]">
                <span className="block text-[0.7rem] tracking-widest uppercase text-[color:var(--accent-text)] font-semibold mb-1">
                  The signature
                </span>
                Double smash, cast-iron chargrilled
              </div>
              <div className="flex flex-col items-end font-display px-4 py-2.5 bg-[color:var(--accent)]/85 text-[color:var(--accent-foreground)] rounded-full backdrop-blur shadow-xl shadow-[color:var(--accent)]/35 flex-shrink-0">
                <span className="text-[0.55rem] tracking-widest font-bold uppercase opacity-80">FROM</span>
                <span className="font-bold text-base">Rs. 780</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustItem({ number, label }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-display font-bold text-2xl">{number}</span>
      <span className="text-[color:var(--muted)] text-xs uppercase tracking-widest">{label}</span>
    </div>
  );
}
