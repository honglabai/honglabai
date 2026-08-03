import { describe, expect, test } from "vitest";
import { validateAppForm } from "@/domain/apps/validation";

// Minimal valid draft. Helper keeps each test focused on the one field it changes.
function form(overrides: Record<string, string | string[]> = {}) {
  const base: Record<string, string | string[]> = {
    slug: "my-app",
    name: "My App",
    publication_status: "draft",
    product_status: "live",
  };
  const merged = { ...base, ...overrides };
  const fd = new FormData();

  for (const [key, value] of Object.entries(merged)) {
    if (value === "") continue; // allow tests to clear a field
    if (Array.isArray(value)) value.forEach((v) => fd.append(key, v));
    else fd.append(key, value);
  }

  return fd;
}

// A published app must satisfy every completeness rule.
const publishedFields = {
  publication_status: "published",
  tagline: "한 줄 소개",
  summary: "요약",
  description: "설명",
  category: "생산성",
  platforms: ["Web"],
  icon_url: "https://example.com/icon.png",
  hero_image_url: "https://example.com/hero.png",
  image_alt: "대체 텍스트",
  seo_title: "SEO 제목",
  seo_description: "SEO 설명",
  web_url: "https://example.com",
};

describe("validateAppForm — required fields", () => {
  test("accepts a minimal draft", () => {
    const result = validateAppForm(form());
    expect(result.ok).toBe(true);
  });

  test("rejects a missing name", () => {
    const result = validateAppForm(form({ name: "" }));
    expect(result).toMatchObject({ ok: false });
  });

  test("rejects a missing slug", () => {
    const result = validateAppForm(form({ slug: "" }));
    expect(result).toMatchObject({ ok: false });
  });
});

describe("validateAppForm — slug format", () => {
  test.each(["my-app", "app2", "a-b-c", "abc"])("accepts %s", (slug) => {
    expect(validateAppForm(form({ slug })).ok).toBe(true);
  });

  test.each(["my_app", "-leading", "trailing-", "double--dash", "한글", "with space"])(
    "rejects %s",
    (slug) => {
      expect(validateAppForm(form({ slug })).ok).toBe(false);
    },
  );

  test("lowercases the slug before validating", () => {
    const result = validateAppForm(form({ slug: "MY-APP" }));
    // Uppercase is normalized, so this passes and stores the lowercase form.
    expect(result).toMatchObject({ ok: true, data: { slug: "my-app" } });
  });
});

describe("validateAppForm — status values", () => {
  test("rejects an unknown publication status", () => {
    expect(validateAppForm(form({ publication_status: "bogus" })).ok).toBe(false);
  });

  test("rejects an unknown product status", () => {
    expect(validateAppForm(form({ product_status: "bogus" })).ok).toBe(false);
  });
});

describe("validateAppForm — external links", () => {
  test("rejects a non-HTTPS link", () => {
    expect(validateAppForm(form({ web_url: "http://example.com" })).ok).toBe(false);
  });

  test("rejects a malformed URL", () => {
    expect(validateAppForm(form({ web_url: "not-a-url" })).ok).toBe(false);
  });

  test("accepts an HTTPS link", () => {
    expect(validateAppForm(form({ web_url: "https://example.com" })).ok).toBe(true);
  });

  test("treats an omitted link as valid", () => {
    expect(validateAppForm(form()).ok).toBe(true);
  });
});

describe("validateAppForm — featured rank", () => {
  test("accepts zero", () => {
    expect(validateAppForm(form({ featured_rank: "0" })).ok).toBe(true);
  });

  test("rejects a negative rank", () => {
    expect(validateAppForm(form({ featured_rank: "-1" })).ok).toBe(false);
  });

  test("rejects a fractional rank", () => {
    expect(validateAppForm(form({ featured_rank: "1.5" })).ok).toBe(false);
  });

  test("rejects a non-numeric rank", () => {
    expect(validateAppForm(form({ featured_rank: "abc" })).ok).toBe(false);
  });
});

describe("validateAppForm — publish completeness", () => {
  test("accepts a fully populated published app", () => {
    expect(validateAppForm(form(publishedFields)).ok).toBe(true);
  });

  test.each([
    ["tagline", "소개"],
    ["summary", "소개"],
    ["description", "소개"],
    ["platforms", "소개"],
    ["icon_url", "아이콘"],
    ["hero_image_url", "아이콘"],
    ["image_alt", "아이콘"],
    ["seo_title", "SEO"],
    ["seo_description", "SEO"],
  ])("rejects publishing without %s", (field, expectedFragment) => {
    const result = validateAppForm(form({ ...publishedFields, [field]: "" }));
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toContain(expectedFragment);
  });

  test("rejects publishing with no store or web link", () => {
    const result = validateAppForm(form({ ...publishedFields, web_url: "" }));
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toContain("링크");
  });

  test("allows a draft to omit everything the publish path requires", () => {
    expect(validateAppForm(form()).ok).toBe(true);
  });

  test("drops unknown platform values", () => {
    const result = validateAppForm(form({ ...publishedFields, platforms: ["Web", "Fridge"] }));
    expect(result).toMatchObject({ ok: true, data: { platforms: ["Web"] } });
  });
});
