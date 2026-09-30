"use client";

import { motion } from "motion/react";
import { drawVariants, fadeVariants } from "@/lib/motion";

const ink = "var(--color-ink)";
const signal = "var(--color-signal)";

/**
 * Plan drawing for the company intro: walls, partitions, a core, dimension
 * strings and a red coordination route that draws in last.
 */
export function FloorPlanDiagram({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 560 460"
      fill="none"
      className={className}
      aria-hidden
      focusable="false"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
    >
      {/* Outer walls (double line) */}
      <motion.path
        d="M40 60 H520 V420 H40 Z"
        stroke={ink}
        strokeWidth={1.5}
        variants={drawVariants}
        custom={0}
      />
      <motion.path
        d="M48 68 H512 V412 H48 Z"
        stroke={ink}
        strokeOpacity={0.5}
        variants={drawVariants}
        custom={0.15}
      />

      {/* Partitions */}
      <motion.path
        d="M270 68 V190 M270 236 V260 H48 M160 260 V412 M380 68 V180 H512 M380 260 H512 M330 260 H352"
        stroke={ink}
        strokeWidth={1.25}
        variants={drawVariants}
        custom={0.6}
      />

      {/* Door swings */}
      <motion.g
        stroke={ink}
        strokeOpacity={0.4}
        variants={fadeVariants}
        custom={1.2}
      >
        <path d="M270 190 A46 46 0 0 1 316 236" strokeDasharray="3 4" />
        <line x1={270} y1={190} x2={316} y2={190} />
        <path d="M352 260 A26 26 0 0 0 378 286" strokeDasharray="3 4" />
      </motion.g>

      {/* Core with stair */}
      <motion.g
        stroke={ink}
        strokeOpacity={0.35}
        variants={fadeVariants}
        custom={1.1}
      >
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={392 + i * 13} y1={80} x2={392 + i * 13} y2={168} />
        ))}
        <line x1={392} y1={124} x2={496} y2={124} strokeOpacity={0.6} />
      </motion.g>

      {/* Room tags */}
      <motion.g
        variants={fadeVariants}
        custom={1.4}
        fill={ink}
        fillOpacity={0.55}
        className="font-display"
        fontSize={10}
        letterSpacing={1.6}
      >
        <text x={70} y={100}>
          ZONE 01
        </text>
        <text x={292} y={216}>
          ZONE 02
        </text>
        <text x={70} y={290}>
          PLANT
        </text>
        <text x={186} y={290}>
          ZONE 03
        </text>
        <text x={400} y={208}>
          CORE
        </text>
      </motion.g>

      {/* Dimension strings */}
      <motion.g
        stroke={ink}
        strokeOpacity={0.45}
        variants={fadeVariants}
        custom={1.6}
      >
        <line x1={40} y1={30} x2={520} y2={30} />
        {[40, 270, 380, 520].map((x) => (
          <g key={x}>
            <line x1={x} y1={22} x2={x} y2={38} />
            <line x1={x - 5} y1={35} x2={x + 5} y2={25} />
          </g>
        ))}
        <line x1={546} y1={60} x2={546} y2={420} />
        {[60, 260, 420].map((y) => (
          <g key={y}>
            <line x1={538} y1={y} x2={554} y2={y} />
            <line x1={541} y1={y + 5} x2={551} y2={y - 5} />
          </g>
        ))}
      </motion.g>
      <motion.g
        variants={fadeVariants}
        custom={1.8}
        fill={ink}
        fillOpacity={0.6}
        className="font-display"
        fontSize={9}
        letterSpacing={1.2}
        textAnchor="middle"
      >
        <text x={155} y={18}>
          9 600
        </text>
        <text x={325} y={18}>
          4 400
        </text>
        <text x={450} y={18}>
          5 600
        </text>
      </motion.g>

      {/* Red coordination route */}
      <motion.path
        d="M104 412 V336 H300 V224 H446 V124"
        stroke={signal}
        strokeWidth={1.5}
        variants={drawVariants}
        custom={2}
      />
      {[
        [104, 336],
        [300, 224],
        [446, 124],
      ].map(([x, y], i) => (
        <motion.g key={i} variants={fadeVariants} custom={2.4 + i * 0.25}>
          <circle cx={x} cy={y} r={3.5} fill={signal} />
          <circle cx={x} cy={y} r={9} stroke={signal} strokeOpacity={0.45} />
          <line x1={x - 16} y1={y} x2={x - 11} y2={y} stroke={signal} />
          <line x1={x + 11} y1={y} x2={x + 16} y2={y} stroke={signal} />
        </motion.g>
      ))}
      <motion.text
        x={112}
        y={404}
        fill={signal}
        className="font-display"
        fontSize={9}
        letterSpacing={1.6}
        variants={fadeVariants}
        custom={2.6}
      >
        COORDINATION ROUTE
      </motion.text>

      {/* North point */}
      <motion.g
        variants={fadeVariants}
        custom={1.8}
        stroke={ink}
        strokeOpacity={0.6}
      >
        <circle cx={500} cy={448} r={9} />
        <path
          d="M500 436 L504 452 L500 449 L496 452 Z"
          fill={ink}
          fillOpacity={0.6}
        />
      </motion.g>
    </motion.svg>
  );
}
