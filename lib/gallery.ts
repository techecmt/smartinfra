// Before & after photos of completed jobs.
//
// Only real Smart Infratech work belongs here. Put photos in
// `public/images/gallery/` and reference them as "/images/gallery/<file>".
// The gallery section stays hidden for a division until it has entries.

import type { DivisionKey } from "./content";

export type GalleryEntry = {
  id: string;
  division: DivisionKey;
  /** e.g. "Chemical overhaul — wall-mounted unit" */
  title: string;
  before: string;
  beforeAlt: string;
  after: string;
  afterAlt: string;
};

export const galleryEntries: GalleryEntry[] = [];
