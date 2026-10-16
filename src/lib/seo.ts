/**
 * Single source of truth for SEO metadata.
 *
 * Routes call `buildSeoHead()` from their `head()` option; the root route adds the
 * site-wide tags (icons, manifest, robots, theme colour, structured data).
 */

export const SITE_NAME = "ChosenAlpha";
export const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://www.chosenalpha.com").replace(/\/+$/, "");
export const SITE_LOCALE = "en_US";
export const THEME_COLOR = "#0e0d12";

export const DEFAULT_TITLE = "ChosenAlpha — Break the Silence";
export const DEFAULT_DESCRIPTION =
  "Something big is coming. ChosenAlpha, founded by Alican Koçman, Founder & CEO. The next chapter starts with you.";

export const FOUNDER = { name: "Alican Koçman", jobTitle: "Founder & CEO" } as const;

export const OG_IMAGE = {
  path: "/og-image.png",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "ChosenAlpha — a glowing purple alpha symbol on black. Something big is coming.",
} as const;

export const SEO_KEYWORDS = [
  "ChosenAlpha",
  "Chosen Alpha",
  "Alican Koçman",
  "coming soon",
  "launch",
  "startup",
] as const;

/** Resolve a site-relative path to an absolute URL on the canonical origin. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, `${SITE_URL}/`).toString();
}

export type SeoHeadOptions = {
  title?: string;
  description?: string;
  /** Site-relative path used for the canonical URL and `og:url`. */
  path?: string;
  image?: { path: string; width: number; height: number; type: string; alt: string };
  type?: "website" | "article";
  /** Set to true for pages search engines should not index (error pages, previews). */
  noIndex?: boolean;
};

export type MetaTag = {
  title?: string;
  name?: string;
  property?: string;
  content?: string;
  charSet?: string;
  /** TanStack Router renders this as a `<script type="application/ld+json">`. */
  "script:ld+json"?: Record<string, unknown>;
};

export type LinkTag = {
  rel: string;
  href: string;
  type?: string;
  sizes?: string;
};

/** Build the per-page `<title>`, description, canonical and social cards. */
export function buildSeoHead({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = OG_IMAGE,
  type = "website",
  noIndex = false,
}: SeoHeadOptions = {}): { meta: MetaTag[]; links: LinkTag[] } {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image.path);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large" },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: imageUrl },
      { property: "og:image:secure_url", content: imageUrl },
      { property: "og:image:type", content: image.type },
      { property: "og:image:width", content: String(image.width) },
      { property: "og:image:height", content: String(image.height) },
      { property: "og:image:alt", content: image.alt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
      { name: "twitter:image:alt", content: image.alt },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

/** Site-wide tags that belong on the root route only. */
export function buildSiteHead(): { meta: MetaTag[]; links: LinkTag[] } {
  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "application-name", content: SITE_NAME },
      { name: "apple-mobile-web-app-title", content: SITE_NAME },
      { name: "author", content: FOUNDER.name },
      { name: "keywords", content: SEO_KEYWORDS.join(", ") },
      { name: "theme-color", content: THEME_COLOR },
      { name: "color-scheme", content: "dark" },
      { name: "format-detection", content: "telephone=no" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: SITE_LOCALE },
      { "script:ld+json": organizationJsonLd() },
      { "script:ld+json": websiteJsonLd() },
    ],
    links: [
      { rel: "icon", href: "/icon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
    ],
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: { "@type": "ImageObject", url: absoluteUrl("/icon-512.png"), width: 512, height: 512 },
    image: absoluteUrl(OG_IMAGE.path),
    description: DEFAULT_DESCRIPTION,
    founder: {
      "@type": "Person",
      name: FOUNDER.name,
      jobTitle: FOUNDER.jobTitle,
      worksFor: { "@id": `${SITE_URL}/#organization` },
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}
