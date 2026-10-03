// Full-bleed hero scene. Two pre-composed variants (wide / tall). The picture is positioned with the same
// "cover" maths the browser uses, so the live 3D burger can be dropped exactly where the baked one sits.
export const SCENE = {
  wide: { w: 2400, h: 1350, fx: 0.65, fy: 0.5, ax: 0.72, ay: 0.674, bw: 0.41, name: "wide" },
  tall: { w: 1200, h: 2400, fx: 0.5, fy: 0.7, ax: 0.5, ay: 0.711, bw: 0.83, name: "tall" },
};
export const pickVariant = () =>
  window.matchMedia("(max-aspect-ratio: 1/1)").matches ? SCENE.tall : SCENE.wide;
export function cover(v, W, H) {
  const s = Math.max(W / v.w, H / v.h);
  return { s, ox: (W - v.w * s) * v.fx, oy: (H - v.h * s) * v.fy };
}
