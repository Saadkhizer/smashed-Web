"use client";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CATS, CATLABEL, MENU, fmt, matches } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { buildLine, defaultSel } from "@/lib/line";
import { flyToCart } from "@/lib/fly";
import { M, reduced } from "@/lib/motion";
import { Flame, SearchIcon } from "./Icons";

gsap.registerPlugin(ScrollTrigger);

const CHIPS = [{ id: "all", label: "All" }, { id: "best", label: "★ Best sellers" }, ...CATS.map((c) => ({ id: c.id, label: c.label }))];

function Card({ it }) {
  const { add, setItem } = useCart();
  const btn = useRef(null);
  return (
    <article className="card" data-card>
      <div className="card-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={it.img} alt={it.name} loading="lazy" width="600" height="600" />
        <div className="card-badges">
          {it.bestseller && <span className="badge">Best seller</span>}
          {it.sig && <span className="badge">Signature</span>}
          {it.feeds && <span className="badge">{it.feeds}</span>}
        </div>
        {it.heat > 0 && <span className="card-heat" aria-label={`Heat level ${it.heat} of 3`}>{Array.from({ length: it.heat }, (_, i) => <Flame key={i} />)}</span>}
      </div>
      <div className="card-body">
        <h3 className="card-name"><button className="card-open" onClick={() => setItem(it)}>{it.name}</button></h3>
        <p className="card-desc">{it.tag}</p>
        <div className="card-foot">
          <span className="price">{fmt(it.price)}</span>
          <button
            ref={btn} className="add" aria-label={`Quick add ${it.name}`}
            onClick={() => { add(buildLine(it, defaultSel(it))); flyToCart(btn.current, it.img); }}
          >+</button>
        </div>
      </div>
    </article>
  );
}

// "Pill wave": cards land with back.out(1.4) overshoot, staggered along the grid diagonal.
function diag(cards) {
  const info = cards.map((el) => {
    const r = el.getBoundingClientRect();
    return { el, x: r.left, y: r.top + window.scrollY, w: r.width, h: r.height };
  });
  const minX = Math.min(...info.map((i) => i.x));
  const minY = Math.min(...info.map((i) => i.y));
  info.forEach((i) => { i.col = Math.round((i.x - minX) / (i.w + 8)); i.row = Math.round((i.y - minY) / (i.h + 8)); i.d = i.col + i.row; });
  return info;
}

export default function Menu() {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const root = useRef(null);
  const bar = useRef(null);
  const search = useRef(null);
  const intro = useRef(null); // batch triggers for the first scroll-in

  const list = useMemo(() => {
    return MENU.filter((it) => {
      if (cat === "best" && !it.bestseller) return false;
      if (cat !== "all" && cat !== "best" && it.cat !== cat) return false;
      return !q.trim() || matches(it, q);
    });
  }, [cat, q]);

  const groups = useMemo(() => {
    if (cat !== "all" || q.trim()) return [{ id: "flat", label: null, items: list }];
    return CATS.map((c) => ({ id: c.id, label: c.label, items: list.filter((i) => i.cat === c.id) })).filter((g) => g.items.length);
  }, [list, cat, q]);

  // filter shortcut from elsewhere (promo band)
  useEffect(() => {
    const on = (e) => { setCat(e.detail); setQ(""); };
    window.addEventListener("smashed:filter", on);
    return () => window.removeEventListener("smashed:filter", on);
  }, []);

  // "/" focuses the search
  useEffect(() => {
    const on = (e) => {
      if (e.key === "/" && !/input|textarea/i.test(document.activeElement?.tagName || "")) { e.preventDefault(); search.current?.focus(); }
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, []);

  // chips bar gets a hairline once it sticks
  useEffect(() => {
    const el = bar.current;
    const on = () => el.classList.toggle("stuck", el.getBoundingClientRect().top <= 80 + 1);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // first scroll-in (once)
  useEffect(() => {
    if (reduced()) return;
    const cards = gsap.utils.toArray("[data-card]", root.current);
    gsap.set(cards, { y: M.distance.far, opacity: 0, scale: 0.92 });
    intro.current = ScrollTrigger.batch(cards, {
      start: "top 94%", once: true,
      onEnter: (batch) => {
        const info = diag(batch);
        const min = Math.min(...info.map((i) => i.d));
        info.forEach((i) => gsap.to(i.el, {
          y: 0, opacity: 1, scale: 1, duration: M.duration.base, ease: M.ease.entrance,
          delay: (i.d - min) * M.stagger.tight, clearProps: "transform,opacity",
        }));
      },
    });
    return () => { intro.current?.forEach((t) => t.kill()); };
  }, []);

  // re-entry whenever the filter/search changes (quick, only the visible set)
  const mounted = useRef(false);
  useLayoutEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    intro.current?.forEach((t) => t.kill()); intro.current = null;
    const cards = gsap.utils.toArray("[data-card]", root.current);
    gsap.killTweensOf(cards);
    if (reduced()) { gsap.set(cards, { clearProps: "all" }); return; }
    const info = diag(cards);
    info.forEach((i) => gsap.fromTo(i.el,
      { y: 24, opacity: 0, scale: 0.94 },
      { y: 0, opacity: 1, scale: 1, duration: M.duration.fast + 0.1, ease: M.ease.entrance, delay: i.d * M.stagger.tight, clearProps: "transform,opacity" }));
  }, [cat, q]);

  return (
    <section className="sec" id="menu" ref={root}>
      <div className="wrap">
        <div className="menu-top">
          <div className="sec-head" style={{ marginBottom: 0 }}>
            <span className="eyebrow" data-reveal>The menu</span>
            <h2 className="h2" data-split>Pick it. Stack it. <em className="flourish">Smash</em> it.</h2>
          </div>
          <label className="search" data-reveal>
            <SearchIcon />
            <span className="sr">Search the menu</span>
            <input ref={search} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search — try “spicy” or “fries”" />
            {q ? <button type="button" className="clear" onClick={() => setQ("")} aria-label="Clear search">×</button> : <kbd>/</kbd>}
          </label>
        </div>

        <div className="chips-bar" ref={bar}>
          <div className="chips" role="group" aria-label="Menu categories">
            {CHIPS.map((c) => (
              <button key={c.id} className="chip" aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>{c.label}</button>
            ))}
          </div>
        </div>

        {list.length === 0 && (
          <div className="empty"><b>Nothing matches “{q}”</b>Try “beef”, “spicy” or “fries”.</div>
        )}
        {groups.map((g) => (
          <div className="group" key={g.id}>
            {g.label && <div className="group-head"><h3>{g.label}</h3><span>{g.items.length} items</span></div>}
            <div className="grid">{g.items.map((it) => <Card key={it.id} it={it} />)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
