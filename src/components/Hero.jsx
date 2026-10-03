"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { reduced } from "@/lib/motion";
import { pickVariant } from "@/lib/heroScene";

gsap.registerPlugin(ScrollTrigger);

// Low-powered phones get the static scene instead of WebGL.
function lowPower() {
  const n = navigator;
  if (n.deviceMemory && n.deviceMemory <= 2) return true;
  if (window.matchMedia("(pointer: coarse)").matches && n.hardwareConcurrency && n.hardwareConcurrency <= 4) return true;
  return false;
}

export default function Hero() {
  const heroRef = useRef(null);
  const mediaRef = useRef(null);
  const canvasRef = useRef(null);
  const plateRef = useRef(null);

  // Live 3D burger. The baked picture (burger included) shows instantly and stays as the fallback;
  // once the empty plate has loaded and the first 3D frame is drawn, we cross-fade to the live burger.
  useEffect(() => {
    if (reduced() || lowPower()) return;
    let cleanup = () => {};
    let cancelled = false;
    const v = pickVariant();
    const plate = plateRef.current;
    plate.onload = () => {
      if (cancelled) return;
      import("@/lib/heroBurger").then(({ initHeroBurger }) => {
        if (cancelled) return;
        try {
          cleanup = initHeroBurger({
            hero: heroRef.current, wrap: mediaRef.current, canvas: canvasRef.current,
            onFirstFrame: () => heroRef.current.classList.add("gl"),
          });
        } catch (e) { /* no WebGL: baked picture stays */ }
      });
    };
    plate.src = `/images/hero/${v.name}-plate.webp`;
    return () => { cancelled = true; cleanup(); heroRef.current?.classList.remove("gl"); };
  }, []);

  // Parallax: the whole picture group drifts a little slower than the page. Linear, scroll-tied.
  useEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      gsap.to(mediaRef.current, {
        y: 70, ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="hero-media" ref={mediaRef} aria-hidden="false">
        <picture>
          <source media="(max-aspect-ratio: 1/1)" srcSet="/images/hero/tall-full.webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hero-full" src="/images/hero/wide-full.webp" width="2400" height="1350" fetchPriority="high"
            alt="A double smash cheeseburger on paper, with a carton of fries behind it" />
        </picture>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hero-plate" ref={plateRef} alt="" aria-hidden="true" />
        <canvas id="hero-gl" ref={canvasRef} aria-hidden="true" />
      </div>

      <div className="hero-in">
        <div className="hero-copy">
          <p className="hero-eyebrow"><span className="star">★ 4.9</span> on foodpanda <i /> Bahria Enclave, Islamabad</p>
          <h1 className="hero-title"><span>Big flavor.</span><span>Properly <em className="flourish">smashed.</em></span></h1>
          <p className="hero-sub">Lacy-edged smash patties, crispy chicken and loaded fries, straight off a screaming-hot plate.</p>
          <div className="hero-cta">
            <a href="#menu" className="btn btn-primary" data-magnetic>Order now <span aria-hidden="true">→</span></a>
            <a href="#menu" className="link-u">View menu</a>
          </div>
          <ul className="hero-facts">
            <li>Fresh beef, never frozen</li>
            <li>Fries from <b>Rs. 350</b></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
