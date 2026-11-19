/**
 * Adresse JSON-LD dérivée du content contact (pas de hardcode route).
 * Ex. row « Adresse » / « Address » : « Bamako, ACI 2000, Mali »
 */

import type { ContactRowContent } from "~/content/types";

export type PostalAddressFromContent = {
  addressLocality: string;
  addressRegion?: string;
  addressCountry: string;
};

const COUNTRY_ISO: Record<string, string> = {
  mali: "ML",
  france: "FR",
  togo: "TG",
};

/**
 * Cherche la ligne Adresse/Address dans les rows contact Figma.
 * Fallback minimal si absente (ne pas inventer de rue).
 */
export function postalAddressFromContactRows(
  rows: ContactRowContent[],
): PostalAddressFromContent | null {
  const row = rows.find((r) => {
    const label = r.label.trim().toLowerCase();
    return label === "adresse" || label === "address";
  });

  if (!row?.value.trim()) return null;

  const parts = row.value
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);

  if (parts.length === 0) return null;

  const locality = parts[0];
  const region = parts.length >= 3 ? parts[1] : undefined;
  const countryRaw = parts.length >= 2 ? parts[parts.length - 1] : undefined;
  const country =
    countryRaw && COUNTRY_ISO[countryRaw.toLowerCase()]
      ? COUNTRY_ISO[countryRaw.toLowerCase()]
      : countryRaw && countryRaw.length === 2
        ? countryRaw.toUpperCase()
        : "ML";

  return {
    addressLocality: locality,
    ...(region ? { addressRegion: region } : {}),
    addressCountry: country,
  };
}
