import Image from "next/image";
import Link from "next/link";
import type { Photo } from "@/lib/photos";

/** Shared top-of-page block for the inner pages: breadcrumb, H1, intro, actions. */
export function PageHeader({
  crumb,
  title,
  eyebrow,
  intro,
  photo,
  cover = false,
  meta,
  children,
}: {
  crumb: string;
  title: string;
  eyebrow?: string;
  intro: string;
  photo?: Photo;
  /** Run the photo full-bleed behind the text instead of beside it. */
  cover?: boolean;
  /** Small line under the actions, e.g. a starting price and opening hours. */
  meta?: string;
  children?: React.ReactNode;
}) {
  const onPhoto = cover && photo;
  return (
    <section
      aria-labelledby="page-heading"
      className={`relative isolate overflow-hidden border-b border-rule ${onPhoto ? "bg-ink-deep" : "bg-paper"}`}
    >
      {onPhoto ? (
        <>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            priority
            placeholder="blur"
            sizes="100vw"
            className="-z-20 object-cover object-[72%_center] lg:object-center"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-ink-deep/75 lg:bg-transparent lg:bg-linear-to-r lg:from-ink-deep/95 lg:via-ink-deep/60 lg:to-transparent"
          />
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1 bg-signal"
          />
        </>
      ) : (
        <div
          aria-hidden
          className="grid-blueprint absolute inset-0 -z-10 [mask-image:linear-gradient(to_left,black,transparent_70%)]"
        />
      )}
      <div
        className={`container-site grid grid-cols-1 items-center gap-10 lg:grid-cols-12 ${onPhoto ? "py-10 sm:py-24 md:min-h-[calc(100svh-7.25rem)]" : "py-10 sm:py-20"}`}
      >
        <div className="lg:col-span-7">
          <nav aria-label="Breadcrumb">
            <ol
              className={`label-tech flex items-center gap-3 ${onPhoto ? "text-white/70" : "text-ink-muted"}`}
            >
              <li>
                <Link
                  href="/"
                  className={onPhoto ? "hover:text-white" : "hover:text-ink"}
                >
                  Home
                </Link>
              </li>
              <li aria-hidden className="h-px w-6 bg-signal" />
              <li
                aria-current="page"
                className={onPhoto ? "text-white" : "text-ink"}
              >
                {crumb}
              </li>
            </ol>
          </nav>
          <h1
            id="page-heading"
            className={`mt-6 font-display text-[2.25rem] leading-[1.02] font-medium tracking-[-0.035em] sm:mt-8 sm:text-6xl ${onPhoto ? "text-white" : "text-ink"}`}
          >
            {title}
          </h1>
          {eyebrow ? (
            <p
              className={`mt-4 font-display text-lg sm:text-xl ${onPhoto ? "text-white max-sm:hidden" : "text-ink"}`}
            >
              {eyebrow}
            </p>
          ) : null}
          <p
            className={`mt-4 max-w-2xl leading-relaxed sm:mt-5 sm:text-lg ${onPhoto ? "text-white/85" : "text-ink-muted"}`}
          >
            {intro}
          </p>
          {children ? (
            <div
              data-book-anchor
              className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center"
            >
              {children}
            </div>
          ) : null}
          {meta ? (
            <p
              className={`label-tech mt-5 ${onPhoto ? "text-white/70" : "text-ink-muted"}`}
            >
              {meta}
            </p>
          ) : null}
        </div>

        {photo && !cover ? (
          <div className="relative aspect-[3/2] overflow-hidden bg-rule lg:col-span-5">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1 bg-signal"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
