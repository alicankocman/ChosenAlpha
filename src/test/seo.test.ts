import { describe, expect, it } from "vitest";
import { SITE_URL, absoluteUrl, buildSeoHead, buildSiteHead, organizationJsonLd, websiteJsonLd, type MetaTag } from "@/lib/seo";

const metaValue = (meta: MetaTag[], key: string) =>
  meta.find((m) => m.name === key || m.property === key)?.content;

describe("SEO head builders", () => {
  it("uses the canonical www origin without a trailing slash", () => {
    expect(SITE_URL).toBe("https://www.chosenalpha.com");
    expect(absoluteUrl("/")).toBe("https://www.chosenalpha.com/");
    expect(absoluteUrl("/og-image.png")).toBe("https://www.chosenalpha.com/og-image.png");
  });

  it("emits title, description, canonical and matching social cards", () => {
    const { meta, links } = buildSeoHead({ title: "Test title", description: "Test description", path: "/" });

    expect(meta.find((m) => m.title)?.title).toBe("Test title");
    expect(metaValue(meta, "description")).toBe("Test description");
    expect(metaValue(meta, "og:title")).toBe("Test title");
    expect(metaValue(meta, "twitter:title")).toBe("Test title");
    expect(metaValue(meta, "og:url")).toBe("https://www.chosenalpha.com/");
    expect(metaValue(meta, "og:image")).toBe("https://www.chosenalpha.com/og-image.png");
    expect(metaValue(meta, "og:image:width")).toBe("1200");
    expect(metaValue(meta, "og:image:height")).toBe("630");
    expect(metaValue(meta, "twitter:card")).toBe("summary_large_image");
    expect(metaValue(meta, "robots")).toContain("index, follow");
    expect(links).toContainEqual({ rel: "canonical", href: "https://www.chosenalpha.com/" });
  });

  it("marks pages as noindex when requested", () => {
    expect(metaValue(buildSeoHead({ noIndex: true }).meta, "robots")).toBe("noindex, nofollow");
  });

  it("links the icons, manifest and sitemap site-wide with valid structured data", () => {
    const { meta, links } = buildSiteHead();
    const rels = links.map((l) => l.rel);

    expect(rels).toEqual(expect.arrayContaining(["icon", "apple-touch-icon", "manifest", "sitemap"]));
    expect(metaValue(meta, "theme-color")).toMatch(/^#[0-9a-f]{6}$/i);
    expect(meta.filter((m) => "script:ld+json" in m)).toHaveLength(2);
    expect(organizationJsonLd()).toMatchObject({ "@type": "Organization", name: "ChosenAlpha", founder: { name: "Alican Koçman" } });
    expect(websiteJsonLd()).toMatchObject({ "@type": "WebSite", url: "https://www.chosenalpha.com/" });
  });
});
