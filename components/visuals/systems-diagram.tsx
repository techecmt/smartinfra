"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

const ink = "var(--color-ink)";
const signal = "var(--color-signal)";
const floors = [140, 212, 284, 356, 428, 500];
const columns = [120, 230, 340, 450, 560];

type Props = {
  progress: MotionValue<number>;
  thresholds: number[];
  className?: string;
};

/**
 * Building section diagram assembled in six layers
 * (building → MEP → safety → inspection → maintenance → efficiency).
 * Each layer fades and settles in as `progress` passes its threshold.
 */
export function SystemsDiagram({
  progress,
  thresholds,
  className = "",
}: Props) {
  const flowLength = useTransform(
    progress,
    [thresholds[5], thresholds[5] + 0.1],
    [0, 1],
  );
  return (
    <svg
      viewBox="0 0 760 560"
      fill="none"
      className={className}
      aria-hidden
      focusable="false"
    >
      <Layer progress={progress} at={thresholds[0]}>
        {/* Foundation */}
        <path d="M60 500 H700" stroke={ink} strokeWidth={1.5} />
        <g stroke={ink} strokeOpacity={0.25}>
          {Array.from({ length: 53 }, (_, i) => (
            <line key={i} x1={64 + i * 12} y1={518} x2={74 + i * 12} y2={506} />
          ))}
        </g>
        {/* Envelope, floors, columns */}
        <path d="M120 500 V140 H560 V500" stroke={ink} strokeWidth={1.5} />
        <path d="M112 140 H568" stroke={ink} strokeWidth={1.5} />
        <g stroke={ink} strokeOpacity={0.35}>
          {floors.slice(1, -1).map((y) => (
            <line key={y} x1={120} y1={y} x2={560} y2={y} />
          ))}
        </g>
        <g stroke={ink} strokeOpacity={0.14}>
          {columns.slice(1, -1).map((x) => (
            <line key={x} x1={x} y1={140} x2={x} y2={500} />
          ))}
        </g>
        <path d="M200 140 V500" stroke={ink} strokeOpacity={0.35} />
      </Layer>

      <Layer progress={progress} at={thresholds[1]}>
        {/* Risers, distribution, plant */}
        <path d="M508 500 V140 M520 500 V140" stroke={ink} strokeWidth={1.25} />
        <path
          d="M444 96 H548 V140 H444 Z M444 96 L548 140 M548 96 L444 140"
          stroke={ink}
          strokeOpacity={0.6}
        />
        <g stroke={ink} strokeOpacity={0.45} strokeDasharray="6 4">
          {floors.slice(0, -1).map((y) => (
            <line key={y} x1={214} y1={y + 12} x2={508} y2={y + 12} />
          ))}
        </g>
        <g stroke={ink} strokeOpacity={0.5}>
          {floors
            .slice(0, -1)
            .flatMap((y) =>
              [270, 350, 430].map((x) => (
                <circle key={`${x}-${y}`} cx={x} cy={y + 22} r={3} />
              )),
            )}
        </g>
      </Layer>

      <Layer progress={progress} at={thresholds[2]}>
        {/* Escape stair, exit, secure perimeter */}
        <g stroke={ink} strokeOpacity={0.6}>
          {floors.slice(0, -1).map((y) => (
            <path key={y} d={`M130 ${y + 70} L190 ${y + 10}`} />
          ))}
        </g>
        <path
          d="M120 470 H70 M82 462 L70 470 L82 478"
          stroke={ink}
          strokeWidth={1.25}
        />
        <path
          d="M92 116 H588 V500"
          stroke={ink}
          strokeOpacity={0.4}
          strokeDasharray="2 5"
        />
        <path
          d="M588 116 L600 108 V124 Z M92 116 L80 108 V124 Z"
          stroke={ink}
          strokeOpacity={0.6}
        />
      </Layer>

      <Layer progress={progress} at={thresholds[3]}>
        {/* Inspection points with leaders */}
        {[
          { x: 300, y: 248, id: "IP-01", ly: 190 },
          { x: 430, y: 320, id: "IP-02", ly: 290 },
          { x: 262, y: 452, id: "IP-03", ly: 440 },
          { x: 496, y: 118, id: "IP-04", ly: 70 },
        ].map((p) => (
          <g key={p.id}>
            <circle cx={p.x} cy={p.y} r={9} stroke={ink} />
            <path
              d={`M${p.x - 14} ${p.y} H${p.x + 14} M${p.x} ${p.y - 14} V${p.y + 14}`}
              stroke={ink}
              strokeOpacity={0.6}
            />
            <path
              d={`M${p.x + 9} ${p.y - 4} L${p.x + 30} ${p.ly} H616`}
              stroke={ink}
              strokeOpacity={0.35}
            />
            <text
              x={622}
              y={p.ly + 3.5}
              fill={ink}
              fillOpacity={0.7}
              className="font-display"
              fontSize={10}
              letterSpacing={1.5}
            >
              {p.id}
            </text>
          </g>
        ))}
      </Layer>

      <Layer progress={progress} at={thresholds[4]}>
        {/* Service cycle over the plant + access panels along the riser */}
        <path
          d="M450 84 A52 40 0 0 1 542 84 M542 84 L534 80 M542 84 L543 75"
          stroke={ink}
          strokeOpacity={0.7}
        />
        <g stroke={ink} strokeOpacity={0.6}>
          {floors.slice(0, -1).map((y) => (
            <path
              key={y}
              d={`M530 ${y + 36} h14 v14 h-14 Z M530 ${y + 36} l14 14`}
            />
          ))}
        </g>
        <text
          x={456}
          y={34}
          fill={ink}
          fillOpacity={0.6}
          className="font-display"
          fontSize={9}
          letterSpacing={1.5}
        >
          SERVICE CYCLE
        </text>
      </Layer>

      <Layer progress={progress} at={thresholds[5]} draw>
        {/* Coordinated flow — the red signal line tying the layers together */}
        <motion.path
          d="M92 486 H514 V132 H496 M514 356 H300 V248 M514 212 H430 V320 M514 470 H262 V452"
          stroke={signal}
          strokeWidth={1.75}
          style={{ pathLength: flowLength }}
        />
        {[
          [514, 486],
          [514, 356],
          [514, 212],
          [514, 132],
          [300, 248],
          [430, 320],
          [262, 452],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={3.5} fill={signal} />
        ))}
        <text
          x={92}
          y={544}
          fill={signal}
          className="font-display"
          fontSize={9}
          letterSpacing={1.5}
        >
          COORDINATED FLOW
        </text>
      </Layer>
    </svg>
  );
}

function Layer({
  progress,
  at,
  draw = false,
  children,
}: {
  progress: MotionValue<number>;
  at: number;
  draw?: boolean;
  children: React.ReactNode;
}) {
  const opacity = useTransform(progress, [at, at + 0.05], [0, 1]);
  const y = useTransform(progress, [at, at + 0.08], [draw ? 0 : 10, 0]);
  return <motion.g style={{ opacity, y }}>{children}</motion.g>;
}
