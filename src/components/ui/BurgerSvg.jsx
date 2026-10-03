// Original SVG "cut-out" burger — deliberately illustrative so the demo works
// before the client sends real cut-out photography. Swap for a PNG later.
export default function BurgerSvg({ className = "", size = 560 }) {
  return (
    <svg
      viewBox="0 0 520 520"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <defs>
        <radialGradient id="bunTop" cx="0.5" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#F4B267" />
          <stop offset="0.7" stopColor="#C67C2A" />
          <stop offset="1" stopColor="#7A3E0F" />
        </radialGradient>
        <radialGradient id="bunBottom" cx="0.5" cy="0.55" r="0.7">
          <stop offset="0" stopColor="#D9924A" />
          <stop offset="1" stopColor="#5A2A08" />
        </radialGradient>
        <linearGradient id="patty" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4E2811" />
          <stop offset="0.5" stopColor="#7A3A16" />
          <stop offset="1" stopColor="#2E1608" />
        </linearGradient>
        <linearGradient id="cheese" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFC33C" />
          <stop offset="1" stopColor="#E68A0A" />
        </linearGradient>
        <linearGradient id="lettuce" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8FCB4A" />
          <stop offset="1" stopColor="#3E7A1E" />
        </linearGradient>
        <filter id="soft" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>

      {/* drop shadow */}
      <ellipse cx="260" cy="470" rx="180" ry="18" fill="#000" opacity="0.5" />

      {/* bottom bun */}
      <path
        d="M80,360 Q80,410 260,410 Q440,410 440,360 L440,340 Q260,370 80,340 Z"
        fill="url(#bunBottom)"
      />

      {/* patty 1 */}
      <path
        d="M70,330 Q70,360 260,360 Q450,360 450,330 Q450,310 260,310 Q70,310 70,330 Z"
        fill="url(#patty)"
      />
      {/* cheese drips */}
      <path
        d="M70,320 Q120,340 180,320 Q240,345 310,320 Q380,342 450,320 L450,335 Q260,355 70,335 Z"
        fill="url(#cheese)"
        filter="url(#soft)"
      />

      {/* lettuce ruffle */}
      <path
        d="M65,300 Q100,270 140,300 Q180,265 220,300 Q260,268 300,300 Q340,266 380,300 Q420,270 460,300 L455,315 Q260,330 70,315 Z"
        fill="url(#lettuce)"
      />

      {/* patty 2 */}
      <path
        d="M75,275 Q75,295 260,295 Q445,295 445,275 Q445,255 260,255 Q75,255 75,275 Z"
        fill="url(#patty)"
      />

      {/* tomato */}
      <ellipse cx="260" cy="248" rx="180" ry="14" fill="#B93321" />
      <ellipse cx="260" cy="245" rx="180" ry="10" fill="#DA4A2C" />

      {/* top bun */}
      <path
        d="M75,235 Q75,110 260,105 Q445,110 445,235 Z"
        fill="url(#bunTop)"
      />
      {/* sesame seeds */}
      {[
        [170, 175], [210, 155], [255, 145], [300, 155], [340, 175],
        [190, 195], [235, 180], [280, 180], [325, 195], [220, 215],
        [260, 210], [300, 215],
      ].map(([cx, cy], i) => (
        <ellipse key={i} cx={cx} cy={cy} rx="5" ry="3" fill="#F7E6A6" opacity="0.9" transform={`rotate(${i * 17} ${cx} ${cy})`} />
      ))}

      {/* bun highlight */}
      <path d="M120,180 Q180,130 260,120" stroke="#FCE0B5" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.5" />
    </svg>
  );
}
