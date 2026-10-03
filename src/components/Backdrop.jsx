"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { canHover, reduced } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

// Fixed ambient layer behind the whole page: dot grid, two drifting colour glows,
// sesame seeds / ketchup dots / mustard rings that float up at different speeds as you scroll,
// and (desktop) a soft spotlight that follows the pointer. Transform/opacity only.
const BITS = [
  ["seed", 6, 12, 340, 18], ["dot", 14, 30, 520, 30], ["ring", 22, 8, 260, -40], ["seed", 31, 52, 420, 70],
  ["dot", 40, 18, 640, -20], ["seed", 52, 70, 300, 40], ["ring", 63, 40, 560, 15], ["dot", 72, 80, 380, -60],
  ["seed", 80, 24, 480, 25], ["ring", 88, 62, 340, -10], ["seed", 92, 88, 600, 55], ["dot", 3, 66, 450, -35],
];

export default function Backdrop() {
  const root = useRef(null);
  const spot = useRef(null);

  useEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".bd-bit").forEach((el) => {
        gsap.to(el, {
          y: -Number(el.dataset.s), rotation: Number(el.dataset.r), ease: "none",
          scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.8 },
        });
      });
      gsap.to(".bd-glow.g1", { y: 220, ease: "none", scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 1 } });
    }, root);

    const cleanups = [() => ctx.revert()];
    if (canHover() && spot.current) {
      const el = spot.current;
      gsap.set(el, { x: window.innerWidth * 0.7, y: window.innerHeight * 0.35 });
      const xTo = gsap.quickTo(el, "x", { duration: 0.9, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.9, ease: "power3" });
      const move = (e) => { gsap.to(el, { opacity: 1, duration: 0.6, overwrite: "auto" }); xTo(e.clientX); yTo(e.clientY); };
      window.addEventListener("mousemove", move, { passive: true });
      cleanups.push(() => window.removeEventListener("mousemove", move));
    }
    return () => cleanups.forEach((f) => f());
  }, []);

  return (
    <div className="bd" ref={root} aria-hidden="true">
      <div className="bd-dots" />
      <div className="bd-glow g1" />
      <div className="bd-glow g2" />
      <div className="bd-spot" ref={spot} />
      {BITS.map(([kind, left, top, s, r], i) => (
        <span key={i} className="bd-bit" data-s={s} data-r={r} style={{ left: left + "%", top: top + "%" }}>
          <i className={kind} style={{ animationDelay: -i * 0.9 + "s", animationDuration: 6 + (i % 4) + "s" }} />
        </span>
      ))}
    </div>
  );
}
