"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useCart } from "@/lib/cart";
import { M } from "@/lib/motion";
import { LogoMark } from "./Icons";

const LINKS = [
  { id: "menu", label: "Menu" },
  { id: "smash", label: "How we smash" },
  { id: "reviews", label: "Reviews" },
  { id: "find", label: "Find us" },
];

// Floating pill nav: links truly centred (1fr / auto / 1fr grid), a mustard pill that
// slides to the hovered or in-view section, a scroll-progress line, and a shrink-on-scroll.
export default function Nav() {
  const { count, setCartOpen } = useCart();
  const [stuck, setStuck] = useState(false);
  const [active, setActive] = useState(null);
  const badge = useRef(null);
  const first = useRef(true);
  const linksEl = useRef(null);
  const ind = useRef(null);
  const prog = useRef(null);
  const shown = useRef(false);

  // scroll state: stuck, progress line, scrollspy
  useEffect(() => {
    let raf = 0;
    const run = () => {
      raf = 0;
      const y = window.scrollY;
      setStuck(y > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (prog.current) prog.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      let cur = null;
      for (const l of LINKS) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) cur = l.id;
      }
      setActive(cur);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(run); };
    run();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);

  const moveTo = (id, instant) => {
    const box = linksEl.current, el = ind.current;
    if (!box || !el) return;
    const a = id && box.querySelector(`[data-id="${id}"]`);
    if (!a) { gsap.to(el, { opacity: 0, duration: 0.25 }); shown.current = false; return; }
    const v = { x: a.offsetLeft, width: a.offsetWidth };
    if (!shown.current || instant) { gsap.set(el, { ...v, opacity: 0 }); shown.current = true; }
    gsap.to(el, { ...v, opacity: 1, duration: 0.5, ease: M.ease.entrance, overwrite: true });
  };
  useEffect(() => { moveTo(active); }, [active]);

  // cart count "bump"
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (!badge.current || count === 0) return;
    gsap.fromTo(badge.current, { scale: 1.6 }, { scale: 1, duration: 0.5, ease: "back.out(3)" });
  }, [count]);

  return (
    <header className={"nav" + (stuck ? " stuck" : "")}>
      <div className="nav-pill">
        <a href="#top" className="logo" aria-label="SMASHED home">
          <span className="logo-mark"><LogoMark /></span>
          <span>SMASH<b>ED</b></span>
        </a>
        <nav className="nav-links" aria-label="Sections" ref={linksEl} onMouseLeave={() => moveTo(active)}>
          <span className="nav-ind" ref={ind} aria-hidden="true" />
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} data-id={l.id} className={active === l.id ? "on" : ""} onMouseEnter={() => moveTo(l.id)}>{l.label}</a>
          ))}
        </nav>
        <div className="nav-right">
          <button className="btn btn-primary cart-btn" data-cart-btn onClick={() => setCartOpen(true)} aria-label={`Open cart, ${count} items`}>
            Cart <span className="cart-count" ref={badge}>{count}</span>
          </button>
        </div>
        <span className="nav-prog" ref={prog} aria-hidden="true" />
      </div>
    </header>
  );
}
