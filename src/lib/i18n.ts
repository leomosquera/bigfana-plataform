/**
 * BigFana — Lightweight i18n helper
 *
 * Current state: active locale is hardcoded to Spanish (LatAm).
 *
 * Future extension points:
 * - Replace `ACTIVE_LOCALE` with a value read from a React context,
 *   a cookie, or a tenant config to enable runtime locale switching.
 * - Support per-tenant copy overrides by merging club dictionaries
 *   on top of the base locale before exporting `copy`.
 * - Move `ACTIVE_LOCALE` to an environment variable for SSR locale
 *   negotiation via `Accept-Language` headers.
 *
 * Usage:
 *   import { copy } from "@/lib/i18n";
 *   <Button>{copy.common.watchLive}</Button>
 */

import { es } from "@/content/copy/es";
import { en } from "@/content/copy/en";
import { pt } from "@/content/copy/pt";
import type { CopyDictionary } from "@/content/copy/es";

export type Locale = "es" | "en" | "pt";

const dictionaries: Record<Locale, CopyDictionary> = { es, en, pt };

// Active locale — swap this to enable a different language globally.
const ACTIVE_LOCALE: Locale = "es";

export const copy: CopyDictionary = dictionaries[ACTIVE_LOCALE];

export type { CopyDictionary };
