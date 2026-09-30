import type { ServiceIllustration as Kind } from "@/lib/content";

type Props = { kind: Kind; className?: string; tone?: "light" | "dark" };

/**
 * Technical line drawings that draw in when their parent `.group` is hovered
 * or focused (see `.draw-on-hover` in globals.css). Every element carries
 * pathLength="1" so the dash animation is length-independent.
 */
export function ServiceIllustration({
  kind,
  className = "",
  tone = "light",
}: Props) {
  const ink = tone === "dark" ? "rgba(255,255,255,0.4)" : "rgba(37,38,56,0.38)";
  const red = "var(--color-signal)";
  return (
    <svg
      viewBox="0 0 240 200"
      fill="none"
      strokeWidth={1}
      className={`draw-on-hover ${className}`}
      aria-hidden
      focusable="false"
    >
      {illustrations[kind](ink, red)}
    </svg>
  );
}

const illustrations: Record<
  Kind,
  (ink: string, red: string) => React.ReactNode
> = {
  construction: (ink, red) => (
    <>
      <path pathLength={1} stroke={ink} d="M0 160 H240" />
      <path pathLength={1} stroke={ink} d="M56 160 V184 H184 V160" />
      <path pathLength={1} stroke={ink} d="M92 160 V40 H148 V160" />
      <path
        pathLength={1}
        stroke={ink}
        d="M92 64 H148 M92 88 H148 M92 112 H148 M92 136 H148 M120 40 V64 M106 64 V88 M134 64 V88 M120 88 V112 M106 112 V136 M134 112 V136 M120 136 V160"
      />
      <path
        pathLength={1}
        stroke={ink}
        d="M72 40 H168 M72 30 H168 M120 30 V40"
      />
      <path
        pathLength={1}
        stroke={red}
        d="M204 30 V160 M198 30 H210 M198 160 H210"
      />
    </>
  ),
  engineering: (ink, red) => (
    <>
      <path
        pathLength={1}
        stroke={ink}
        d="M16 24 H224 V48 H16 Z M16 24 L64 48 M64 24 L112 48 M112 24 L160 48 M160 24 L208 48"
      />
      <path
        pathLength={1}
        stroke={ink}
        d="M0 164 H86 Q100 164 100 150 V100 Q100 86 114 86 H240"
      />
      <path
        pathLength={1}
        stroke={ink}
        d="M0 176 H90 Q112 176 112 154 V106 Q112 98 120 98 H240"
      />
      <path pathLength={1} stroke={red} d="M150 80 L176 104 V80 L150 104 Z" />
      <path pathLength={1} stroke={ink} d="M163 92 V66 M155 66 H171" />
      <path
        pathLength={1}
        stroke={ink}
        d="M40 158 V182 M60 158 V182 M210 80 V104"
      />
    </>
  ),
  renovation: (ink, red) => (
    <>
      <path pathLength={1} stroke={ink} d="M20 184 V24 H220 V184 Z" />
      <path
        pathLength={1}
        stroke={ink}
        d="M20 124 H220 M20 144 H220 M20 164 H220"
      />
      <path
        pathLength={1}
        stroke={ink}
        d="M40 124 V184 M60 124 V184 M80 124 V184 M100 124 V184 M120 124 V184 M140 124 V184 M160 124 V184 M180 124 V184 M200 124 V184"
      />
      <path
        pathLength={1}
        stroke={ink}
        d="M136 44 H196 V104 H136 Z M166 44 V104 M136 74 H196"
      />
      <path
        pathLength={1}
        stroke={red}
        d="M40 44 H104 V64 H40 Z M72 64 V84 H60 V112"
      />
    </>
  ),
  consultancy: (ink, red) => (
    <>
      <path pathLength={1} stroke={ink} d="M16 28 H84 V64 H16 Z" />
      <path pathLength={1} stroke={ink} d="M156 28 H224 V64 H156 Z" />
      <path pathLength={1} stroke={ink} d="M86 132 H154 V168 H86 Z" />
      <path
        pathLength={1}
        stroke={ink}
        d="M84 46 H156 M50 64 V150 H86 M190 64 V150 H154"
      />
      <path pathLength={1} stroke={red} d="M106 150 L116 158 L136 140" />
      <circle pathLength={1} stroke={ink} cx={120} cy={46} r={10} />
    </>
  ),
  security: (ink, red) => (
    <>
      <path
        pathLength={1}
        stroke={ink}
        strokeOpacity={0.6}
        d="M16 24 H224 V176 H16 Z"
      />
      <path pathLength={1} stroke={ink} d="M40 48 H200 V152 H40 Z" />
      <path
        pathLength={1}
        stroke={ink}
        d="M110 152 V136 A14 14 0 0 1 124 150"
      />
      <path
        pathLength={1}
        stroke={red}
        d="M40 48 L108 74 A72 72 0 0 1 72 112 Z"
      />
      <path
        pathLength={1}
        stroke={red}
        d="M200 152 L132 126 A72 72 0 0 1 168 88 Z"
      />
      <circle pathLength={1} stroke={ink} cx={120} cy={100} r={6} />
    </>
  ),
};
