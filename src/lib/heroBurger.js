import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmashedBurger from "./burger";
import { pickVariant, cover } from "./heroScene";

// Hero burger on the full-bleed scene. It holds a still, appetising 3/4 pose and only turns slowly (~100°),
// drifts and eases in scale as the hero scrolls away. No endless spin. Frames are drawn only when something changes.
const WORLD_W = 2.61;   // burger width in world units at scale 1 (calibrated against a capture)
const Y_FIX = 0.0;      // fine vertical calibration, in burger-widths

export function initHeroBurger({ hero, wrap, canvas, onFirstFrame }) {
  gsap.registerPlugin(ScrollTrigger);
  SmashedBurger.init(THREE);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
  } catch (e) {
    return () => {};
  }
  renderer.setClearColor(0x000000, 0);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;

  const scene = new THREE.Scene();
  scene.environment = SmashedBurger.environment(renderer);
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 60);
  const burger = SmashedBurger.create("hero");
  const holder = new THREE.Group();
  const spin = new THREE.Group();
  holder.add(spin);
  spin.add(burger.group);
  scene.add(holder);
  burger.group.position.y = -burger.height / 2;

  const key = new THREE.DirectionalLight("#fff3e2", 2.0); key.position.set(-4, 6, 5); scene.add(key);
  const rim = new THREE.DirectionalLight("#ffb070", 1.4); rim.position.set(5, 3, -5); scene.add(rim);
  const fill = new THREE.DirectionalLight("#fff0d0", 0.55); fill.position.set(5, 1, 4); scene.add(fill);
  scene.add(new THREE.HemisphereLight("#fff1dc", "#8a5a2a", 0.6));
  const shadow = SmashedBurger.shadowBlob();
  shadow.material.opacity = 0.0;      // the scene plate carries the shadow
  shadow.position.y = -burger.height / 2 - 0.02;
  holder.add(shadow);

  const state = { p: 0, px: 0, py: 0 };
  let baseScale = 1, drawn = "", raf = 0, dead = false, first = true, tx = 0, ty = 0, visH = 3.29, W = 1, H = 1;

  function place() {
    const v = pickVariant();
    const c = cover(v, W, H);
    const pxW = v.bw * v.w * c.s;                  // wanted burger width in canvas px
    const pxPerWorld = H / visH;
    baseScale = pxW / (pxPerWorld * WORLD_W);
    tx = c.ox + v.ax * v.w * c.s;                  // centre-x of the burger, canvas px
    ty = c.oy + v.ay * v.h * c.s;                  // y of its base contact, canvas px
  }
  function draw(force) {
    const p = state.p;
    const sig = [p.toFixed(4), state.px.toFixed(3), state.py.toFixed(3), W, H].join();
    if (!force && sig === drawn) return;
    drawn = sig;
    camera.position.set(0, 1.1, 6.6);
    camera.lookAt(0, 0.1, 0);
    spin.rotation.y = 0.55 + p * 1.75 + state.px * 0.3;
    spin.rotation.x = 0.2 + state.py * 0.1 + p * 0.06;
    const sc = baseScale * (1 - p * 0.1);
    holder.scale.setScalar(sc);
    // base of the burger sits at (tx, ty): convert canvas px -> world on the focal plane
    const nx = (2 * tx) / W - 1, ny = 1 - (2 * ty) / H;
    const wx = nx * (visH / 2) * camera.aspect;
    const wy = ny * (visH / 2);
    const half = (burger.height / 2) * sc;
    holder.position.set(wx, wy + half + Y_FIX * sc * WORLD_W - p * 0.3, 0);
    renderer.render(scene, camera);
    if (first) { first = false; onFirstFrame && onFirstFrame(); }
  }
  function layout() {
    W = wrap.clientWidth; H = wrap.clientHeight;
    if (!W || !H) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, W < 700 ? 1.5 : 1.75));
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    visH = 2 * 6.6 * Math.tan((28 / 2) * Math.PI / 180);
    place();
    draw(true);
  }
  function tick() {
    if (dead) return;
    raf = requestAnimationFrame(tick);
    const r = hero.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight || document.hidden) return;
    draw(false);
  }

  window.addEventListener("resize", layout);
  layout();
  raf = requestAnimationFrame(tick);

  const cleanups = [];
  if (window.matchMedia("(hover: hover)").matches) {
    const pxTo = gsap.quickTo(state, "px", { duration: 1.0, ease: "power3" });
    const pyTo = gsap.quickTo(state, "py", { duration: 1.0, ease: "power3" });
    const move = (ev) => {
      const r = hero.getBoundingClientRect();
      pxTo(((ev.clientX - r.left) / r.width) * 2 - 1);
      pyTo(((ev.clientY - r.top) / r.height) * 2 - 1);
    };
    const leave = () => { pxTo(0); pyTo(0); };
    hero.addEventListener("mousemove", move);
    hero.addEventListener("mouseleave", leave);
    cleanups.push(() => { hero.removeEventListener("mousemove", move); hero.removeEventListener("mouseleave", leave); });
  }

  const st = ScrollTrigger.create({
    trigger: hero, start: "top top", end: "bottom top", scrub: 0.9,
    onUpdate: (self) => { state.p = self.progress; },
  });

  return () => {
    dead = true;
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", layout);
    cleanups.forEach((fn) => fn());
    st.kill();
    renderer.dispose();
  };
}
