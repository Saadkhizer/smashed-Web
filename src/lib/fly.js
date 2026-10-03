import gsap from "gsap";
import { reduced } from "./motion";

// Little "it went into the cart" flight: a copy of the dish photo arcs to the cart button.
export function flyToCart(fromEl, src) {
  const to = document.querySelector("[data-cart-btn]");
  if (!fromEl || !to || reduced()) return;
  const a = fromEl.getBoundingClientRect();
  const b = to.getBoundingClientRect();
  const el = document.createElement("img");
  el.src = src; el.alt = ""; el.className = "fly";
  const size = 44;
  Object.assign(el.style, { width: size + "px", height: size + "px", left: a.left + a.width / 2 - size / 2 + "px", top: a.top + a.height / 2 - size / 2 + "px" });
  document.body.appendChild(el);
  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top + a.height / 2);
  gsap.timeline({ onComplete: () => el.remove() })
    .to(el, { x: dx * 0.5, y: dy * 0.5 - 70, scale: 1.15, duration: 0.28, ease: "power2.out" })
    .to(el, { x: dx, y: dy, scale: 0.35, opacity: 0.6, duration: 0.34, ease: "power2.in" });
}
