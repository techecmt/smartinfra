"use client";

import { motion, type Transition } from "motion/react";
import { easeArchitect } from "@/lib/motion";

// Timeline authored at a relaxed pace, then compressed so the full drawing
// resolves in ~2.5s rather than lingering.
const PACE = 0.65;

const draw = (delay: number, duration = 1.6): Transition => ({
  pathLength: {
    delay: delay * PACE,
    duration: duration * 0.85,
    ease: easeArchitect,
  },
  opacity: { delay: delay * PACE, duration: 0.2 },
});

const fade = (delay: number, duration = 1.2): Transition => ({
  delay: delay * PACE,
  duration,
  ease: easeArchitect,
});

const GROUND = 700;
const axes = [
  { x: 110, id: "A" },
  { x: 220, id: "B" },
  { x: 330, id: "C" },
  { x: 460, id: "D" },
  { x: 580, id: "E" },
];

function range(from: number, to: number, step: number) {
  const out: number[] = [];
  for (let v = from; v <= to; v += step) out.push(v);
  return out;
}

/**
 * Abstract Singapore-style tower cluster drawn as an architectural section:
 * structural grid, three towers with fins and floor plates, a podium, a sky
 * bridge and a red services riser. Purely illustrative.
 */
export function HeroArchitecture({ className = "" }: { className?: string }) {
  const stroke = "var(--color-ink)";

  return (
    <svg
      viewBox="0 0 720 760"
      className={className}
      fill="none"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden
      focusable="false"
    >
      {/* Structural grid axes with bubbles */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={fade(0.2, 1.6)}
        stroke={stroke}
        strokeOpacity={0.14}
        strokeWidth={1}
      >
        {axes.map((a) => (
          <g key={a.id}>
            <line
              x1={a.x}
              y1={58}
              x2={a.x}
              y2={GROUND + 30}
              strokeDasharray="2 6"
            />
            <circle cx={a.x} cy={40} r={13} strokeOpacity={0.35} />
            <text
              x={a.x}
              y={44.5}
              textAnchor="middle"
              fill={stroke}
              fillOpacity={0.55}
              stroke="none"
              className="font-display"
              fontSize={11}
              fontWeight={500}
            >
              {a.id}
            </text>
          </g>
        ))}
        {[150, 330, 520].map((y, i) => (
          <g key={y}>
            <line
              x1={24}
              y1={y}
              x2={700}
              y2={y}
              strokeDasharray="2 6"
              strokeOpacity={0.6}
            />
            <text
              x={24}
              y={y - 8}
              fill={stroke}
              fillOpacity={0.5}
              stroke="none"
              className="font-display"
              fontSize={9}
              letterSpacing={1.5}
            >
              {`LVL ${String(30 - i * 12).padStart(2, "0")}`}
            </text>
          </g>
        ))}
      </motion.g>

      {/* Ground line + hatch */}
      <motion.path
        d={`M0 ${GROUND} H720`}
        stroke={stroke}
        strokeWidth={1.25}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={draw(0.3, 1.4)}
      />
      <motion.g
        stroke={stroke}
        strokeOpacity={0.25}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={fade(1.2)}
      >
        {range(4, 716, 12).map((x) => (
          <line key={x} x1={x} y1={GROUND + 14} x2={x + 10} y2={GROUND + 4} />
        ))}
      </motion.g>

      {/* Tower C — main tower, chamfered crown */}
      <motion.path
        d={`M330 ${GROUND} V160 L372 104 H460 V${GROUND}`}
        stroke={stroke}
        strokeWidth={1.5}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={draw(0.5, 2)}
      />
      <motion.g
        stroke={stroke}
        strokeOpacity={0.16}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={fade(1.4)}
      >
        {range(186, 680, 26).map((y) => (
          <line key={y} x1={330} y1={y} x2={460} y2={y} />
        ))}
        {range(346, 446, 16).map((x) => (
          <line
            key={x}
            x1={x}
            y1={x < 372 ? 160 - (x - 330) * 1.3 + 6 : 110}
            x2={x}
            y2={GROUND}
            strokeOpacity={0.6}
          />
        ))}
      </motion.g>

      {/* Tower B — stepped setback */}
      <motion.path
        d={`M200 ${GROUND} V360 H222 V262 H308 V${GROUND}`}
        stroke={stroke}
        strokeWidth={1.25}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={draw(0.75, 1.8)}
      />
      <motion.g
        stroke={stroke}
        strokeOpacity={0.14}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={fade(1.6)}
      >
        {range(290, 680, 22).map((y) => (
          <line key={y} x1={y < 360 ? 222 : 200} y1={y} x2={308} y2={y} />
        ))}
      </motion.g>

      {/* Tower D — slender tower with sky-garden void */}
      <motion.path
        d={`M490 ${GROUND} V300 H572 V${GROUND}`}
        stroke={stroke}
        strokeWidth={1.25}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={draw(0.9, 1.8)}
      />
      <motion.g
        stroke={stroke}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={fade(1.8)}
      >
        <rect x={490} y={420} width={82} height={26} strokeOpacity={0.4} />
        {range(496, 566, 10).map((x) => (
          <line key={x} x1={x} y1={420} x2={x} y2={446} strokeOpacity={0.2} />
        ))}
        {range(324, 680, 24)
          .filter((y) => y < 420 || y > 446)
          .map((y) => (
            <line
              key={y}
              x1={490}
              y1={y}
              x2={572}
              y2={y}
              strokeOpacity={0.14}
            />
          ))}
      </motion.g>

      {/* Sky bridge C–D */}
      <motion.path
        d="M460 372 H490 M460 386 H490"
        stroke={stroke}
        strokeWidth={1.25}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={draw(1.6, 0.8)}
      />

      {/* Phantom future tower, dashed */}
      <motion.path
        d={`M600 ${GROUND} V430 H676 V${GROUND}`}
        stroke={stroke}
        strokeOpacity={0.3}
        strokeDasharray="4 6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={fade(2)}
      />

      {/* Podium with column rhythm */}
      <motion.path
        d={`M140 ${GROUND} V620 H640 V${GROUND}`}
        stroke={stroke}
        strokeWidth={1.25}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={draw(1.1, 1.4)}
      />
      <motion.g
        stroke={stroke}
        strokeOpacity={0.2}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={fade(2)}
      >
        {range(170, 620, 30).map((x) => (
          <line key={x} x1={x} y1={640} x2={x} y2={GROUND} />
        ))}
        <line x1={140} y1={640} x2={640} y2={640} />
      </motion.g>

      {/* Vertical dimension line */}
      <motion.g
        stroke={stroke}
        strokeOpacity={0.45}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={fade(2.1)}
      >
        <line x1={700} y1={104} x2={700} y2={GROUND} />
        <line x1={692} y1={104} x2={708} y2={104} />
        <line x1={692} y1={GROUND} x2={708} y2={GROUND} />
        <line x1={694} y1={110} x2={706} y2={98} />
        <line x1={694} y1={GROUND + 6} x2={706} y2={GROUND - 6} />
        {range(154, 654, 50).map((y) => (
          <line key={y} x1={697} y1={y} x2={703} y2={y} />
        ))}
      </motion.g>

      {/* Red services riser + data points */}
      <motion.path
        d={`M396 ${GROUND} V112`}
        stroke="var(--color-signal)"
        strokeWidth={1.5}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={draw(2, 1.6)}
      />
      <motion.path
        d="M396 386 H531 V300"
        stroke="var(--color-signal)"
        strokeWidth={1}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={draw(2.8, 1.2)}
      />
      {[
        { x: 396, y: 112, d: 3.4, pulse: true },
        { x: 396, y: 386, d: 3.2 },
        { x: 531, y: 300, d: 3.8 },
        { x: 222, y: 262, d: 3.6 },
      ].map((p) => (
        <motion.g
          key={`${p.x}-${p.y}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={fade(p.d, 0.6)}
          style={{ transformOrigin: `${p.x}px ${p.y}px` }}
        >
          {p.pulse ? (
            <circle
              cx={p.x}
              cy={p.y}
              r={4}
              fill="var(--color-signal)"
              className="pulse-ring"
            />
          ) : null}
          <circle cx={p.x} cy={p.y} r={3.5} fill="var(--color-signal)" />
          <circle
            cx={p.x}
            cy={p.y}
            r={8}
            stroke="var(--color-signal)"
            strokeOpacity={0.5}
          />
        </motion.g>
      ))}

      {/* Drawing labels */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={fade(2.4)}
        fill={stroke}
        fillOpacity={0.55}
        className="font-display"
        fontSize={9}
        letterSpacing={1.5}
      >
        <text x={412} y={96}>
          RISER / S-01
        </text>
        <text x={144} y={GROUND + 36}>
          SECTION A–A
        </text>
        <text x={560} y={GROUND + 36}>
          SCALE 1:500
        </text>
      </motion.g>
    </svg>
  );
}
