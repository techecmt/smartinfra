"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";

/**
 * A titled block that is an accordion on phones and always open from tablet
 * width up. The content stays in the page either way, so it remains readable
 * by search engines and reachable by in-page links.
 */
export function MobileCollapse({
  id,
  title,
  summary,
  defaultOpen = false,
  children,
}: {
  id?: string;
  title: string;
  /** Shown under the title whether open or closed. */
  summary?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  return (
    <article id={id} className="border-t-2 border-ink md:pt-6">
      <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-ink md:text-2xl">
        <span className="hidden md:inline">{title}</span>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 py-3 text-left md:hidden"
        >
          {title}
          <Plus
            aria-hidden
            className={`size-5 shrink-0 text-signal transition-transform duration-300 ${open ? "rotate-45" : ""}`}
          />
        </button>
      </h3>
      {summary ? (
        <p className="-mt-2 pb-4 text-ink-muted md:mt-2 md:pb-0">{summary}</p>
      ) : null}
      <div id={panelId} className={open ? "pb-6 md:pb-0" : "hidden md:block"}>
        {children}
      </div>
    </article>
  );
}
