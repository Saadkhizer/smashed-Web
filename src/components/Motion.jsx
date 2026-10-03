"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { M, canHover, reduced } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, SplitText);

// One provider for the whole page: smooth scroll, reveals, split headings, magnetic CTAs.
// Everything below the fold only — the hero never waits. All entrances run once.
export default function Motion() {
  useEffect(() => {
    if (reduced()) return;
    const cleanups = [];

    // Lenis, synced to ScrollTrigger (never alongside ScrollSmoother)
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    const anchor = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      const el = id === "#top" ? 0 : document.querySelector(id);
      if (el === null) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: id === "#top" ? 0 : -88 });
    };
    document.addEventListener("click", anchor);
    cleanups.push(() => { document.removeEventListener("click", anchor); gsap.ticker.remove(raf); lenis.destroy(); window.__lenis = null; });

    const ctx = gsap.context(() => {
      // generic reveal: set + to, once, never on scroll-up
      gsap.utils.toArray("[data-reveal], [data-reveal-card]").forEach((el) => {
        gsap.set(el, { y: M.distance.near, opacity: 0 });
        ScrollTrigger.create({
          trigger: el, start: "top 90%", once: true,
          onEnter: () => gsap.to(el, { y: 0, opacity: 1, duration: M.duration.slow, ease: M.ease.entrance, clearProps: "transform,opacity" }),
        });
      });

      // headings: split by lines, rise from a mask, then revert the DOM
      gsap.utils.toArray("[data-split]").forEach((el) => {
        const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line" });
        gsap.set(split.lines, { yPercent: 110 });
        ScrollTrigger.create({
          trigger: el, start: "top 88%", once: true,
          onEnter: () => gsap.to(split.lines, { yPercent: 0, duration: M.duration.slow, ease: M.ease.entrance, stagger: M.stagger.tight, onComplete: () => split.revert() }),
        });
      });

      // deep band: the fanned cards pop in with the pill overshoot
      gsap.utils.toArray(".fan figure").forEach((f, i) => {
        gsap.set(f, { scale: 0.8, opacity: 0 });
        ScrollTrigger.create({
          trigger: ".band", start: "top 80%", once: true,
          onEnter: () => gsap.to(f, { scale: 1, opacity: 1, duration: M.duration.slow, ease: M.ease.entrance, delay: 0.1 + i * M.stagger.loose }),
        });
      });

      // magnetic CTAs — desktop pointers only, pooled with quickTo
      if (canHover()) {
        gsap.utils.toArray("[data-magnetic]").forEach((el) => {
          const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
          const move = (e) => { const r = el.getBoundingClientRect(); xTo((e.clientX - (r.left + r.width / 2)) * 0.25); yTo((e.clientY - (r.top + r.height / 2)) * 0.35); };
          const leave = () => { xTo(0); yTo(0); };
          el.addEventListener("mousemove", move); el.addEventListener("mouseleave", leave);
          cleanups.push(() => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); });
        });
      }
    });
    cleanups.push(() => ctx.revert());

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    cleanups.push(() => window.removeEventListener("load", refresh));
    return () => cleanups.forEach((fn) => fn());
  }, []);
  return null;
}
