// Organic curved divider — the "not a template" tell from restaurant-noir-ui.
// `fill` is the color the CURVE reveals (i.e. the section BELOW), so the previous
// section stays its own color and the curve carves down into the next.
export default function CurveDivider({ fill = "var(--surface)", flip = false, className = "" }) {
  return (
    <div className={`w-full leading-[0] ${flip ? "rotate-180" : ""} ${className}`} aria-hidden>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full h-[64px] md:h-[100px] block"
      >
        <path
          d="M0,64 C240,120 480,0 720,32 C960,64 1200,120 1440,64 L1440,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
