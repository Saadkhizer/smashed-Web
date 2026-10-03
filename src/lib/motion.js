// Motion tokens — "duotone" personality from the web-motion-system skill.
// Bouncy, energetic, commerce-forward. Change only these numbers to retune the whole site.
export const M = {
  ease: {
    entrance: "back.out(1.4)", // arriving: small overshoot = the "pill" feel
    exit: "power2.in",
    move: "power3.inOut",
    scrub: "none", // scroll-linked motion is always linear
  },
  duration: { fast: 0.35, base: 0.5, slow: 0.7 },
  stagger: { tight: 0.06, loose: 0.12 },
  distance: { near: 24, far: 40 },
};

export const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const canHover = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;
