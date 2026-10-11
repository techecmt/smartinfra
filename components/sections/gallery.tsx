import Image from "next/image";
import type { DivisionKey } from "@/lib/content";
import { galleryEntries } from "@/lib/gallery";
import { SectionMarker } from "@/components/ui/section-heading";

/**
 * Before & after photos for one division, driven by `lib/gallery.ts`.
 * Renders nothing until real photos have been added.
 */
export function Gallery({
  division,
  index,
}: {
  division: DivisionKey;
  index: string;
}) {
  const entries = galleryEntries.filter((e) => e.division === division);
  if (entries.length === 0) return null;

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="bg-white py-16 sm:py-24"
    >
      <div className="container-site">
        <SectionMarker index={index} label="Our work" meta="Before & after" />
        <h2
          id="gallery-heading"
          className="mt-10 font-display text-[2rem] leading-[1.05] font-medium tracking-[-0.03em] text-ink sm:text-5xl"
        >
          Before and after
        </h2>
        <ul className="relative -mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:mt-12 md:grid md:grid-cols-1 md:gap-10 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-2">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="max-md:w-[84%] max-md:shrink-0 max-md:snap-center"
            >
              <figure>
                <div className="grid grid-cols-2 gap-1">
                  <Photo
                    src={entry.before}
                    alt={entry.beforeAlt}
                    tag="Before"
                  />
                  <Photo src={entry.after} alt={entry.afterAlt} tag="After" />
                </div>
                <figcaption className="mt-3 text-ink">{entry.title}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Photo({ src, alt, tag }: { src: string; alt: string; tag: string }) {
  return (
    <div className="relative aspect-square bg-paper">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 25vw, 50vw"
        className="object-cover"
      />
      <span className="label-tech absolute top-2 left-2 bg-ink px-2 py-1 text-white">
        {tag}
      </span>
    </div>
  );
}
