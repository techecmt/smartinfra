// Used & reconditioned aircon units currently available.
//
// Add one entry per real unit in stock and remove it once sold. Put photos in
// `public/images/catalogue/` and reference them as "/images/catalogue/<file>".
// While this list is empty the site shows an "ask for current stock" panel.

export type CatalogueUnit = {
  id: string;
  brand: string;
  model: string;
  /** e.g. "9,000 BTU" or "System 3 (9k + 9k + 18k)" */
  capacity: string;
  /** e.g. "About 3 years" */
  age: string;
  /** e.g. "Reconditioned — chemically cleaned and tested" */
  condition: string;
  /** e.g. "$650" */
  price: string;
  installationIncluded: boolean;
  /** e.g. "3 months on compressor" */
  warranty: string;
  image?: string;
  imageAlt?: string;
};

export const catalogueUnits: CatalogueUnit[] = [];
