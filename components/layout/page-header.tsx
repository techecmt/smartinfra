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
  children,
}: {
  crumb: string;
  title: string;
  eyebrow?: string;
  intro: string;
  photo?: Photo;
  children?: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby="page-heading"
      className="relative isolate overflow-hidden border-b border-rule bg-paper"
    >
      <div
        aria-hidden
        className="grid-blueprint absolute inset-0 -z-10 [mask-image:linear-gradient(to_left,black,transparent_70%)]"
      />
      <div className="container-site grid grid-cols-1 items-center gap-10 py-14 sm:py-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <nav aria-label="Breadcrumb">
            <ol className="label-tech flex items-center gap-3 text-ink-muted">
              <li>
                <Link href="/" className="hover:text-ink">
                  Home
                </Link>
              </li>
              <li aria-hidden className="h-px w-6 bg-signal" />
              <li aria-current="page" className="text-ink">
                {crumb}
              </li>
            </ol>
          </nav>
          <h1
            id="page-heading"
            className="mt-8 font-display text-[2.5rem] leading-[1.02] font-medium tracking-[-0.035em] text-ink sm:text-6xl"
          >
            {title}
          </h1>
          {eyebrow ? (
            <p className="mt-4 font-display text-lg text-ink sm:text-xl">
              {eyebrow}
            </p>
          ) : null}
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
            {intro}
          </p>
          {children ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              {children}
            </div>
          ) : null}
        </div>

        {photo ? (
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
