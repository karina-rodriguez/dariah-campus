import { createUrl } from "@acdh-oeaw/lib";
import { expect, test } from "@playwright/test";

import { env } from "@/config/env.config";
import { locales } from "@/config/i18n.config";

test("sets a canonical url", async ({ page }) => {
	for (const locale of locales) {
		await page.goto(`/${locale}`);

		const canonicalUrl = page.locator('link[rel="canonical"]');
		await expect(canonicalUrl).toHaveAttribute(
			"href",
			String(createUrl({ baseUrl: env.NEXT_PUBLIC_APP_BASE_URL, pathname: `/${locale}` })),
		);
	}
});

/** FIXME: @see https://github.com/vercel/next.js/issues/45620 */
test.fixme("sets document title on not-found page", async ({ page }) => {
	await page.goto("/unknown");
	await expect(page).toHaveTitle("Page not found | DARIAH-Campus");

	await page.goto("/de/unknown");
	await expect(page).toHaveTitle("Seite nicht gefunden | DARIAH-Campus");
});

/** FIXME: @see https://github.com/vercel/next.js/issues/45620 */
test.fixme("disallows indexing of not-found page", async ({ page }) => {
	for (const pathname of ["/unknown", "/de/unknown"]) {
		await page.goto(pathname);

		const ogTitle = page.locator('meta[name="robots"]');
		await expect(ogTitle).toHaveAttribute("content", "nofollow, noindex");
	}
});

test.describe("sets page metadata", () => {
	test("static", async ({ page }) => {
		await page.goto("/en");

		const ogType = page.locator('meta[property="og:type"]');
		await expect(ogType).toHaveAttribute("content", "website");

		const twCard = page.locator('meta[name="twitter:card"]');
		await expect(twCard).toHaveAttribute("content", "summary_large_image");

		const twCreator = page.locator('meta[name="twitter:creator"]');
		await expect(twCreator).toHaveAttribute("content", "@dariaheu");

		const twSite = page.locator('meta[name="twitter:site"]');
		await expect(twSite).toHaveAttribute("content", "@dariaheu");

		// const googleSiteVerification = page.locator('meta[name="google-site-verification"]');
		// await expect(googleSiteVerification).toHaveAttribute("content", "");
	});

	test("with en locale", async ({ page }) => {
		await page.goto("/en");

		await expect(page).toHaveTitle("DARIAH-Campus");

		const metaDescription = page.locator('meta[name="description"]');
		await expect(metaDescription).toHaveAttribute(
			"content",
			"Discovery framework and hosting platform for digital humanities learning resources.",
		);

		const ogTitle = page.locator('meta[property="og:title"]');
		await expect(ogTitle).toHaveAttribute("content", "DARIAH-Campus");

		const ogDescription = page.locator('meta[property="og:description"]');
		await expect(ogDescription).toHaveAttribute(
			"content",
			"Discovery framework and hosting platform for digital humanities learning resources.",
		);

		const ogUrl = page.locator('meta[property="og:url"]');
		await expect(ogUrl).toHaveAttribute(
			"content",
			String(createUrl({ baseUrl: env.NEXT_PUBLIC_APP_BASE_URL, pathname: "/en" })),
		);

		const ogLocale = page.locator('meta[property="og:locale"]');
		await expect(ogLocale).toHaveAttribute("content", "en");
	});

	test("with de locale", async ({ page }) => {
		await page.goto("/de");

		await expect(page).toHaveTitle("DARIAH-Campus");

		const metaDescription = page.locator('meta[name="description"]');
		await expect(metaDescription).toHaveAttribute(
			"content",
			"Entdeckungs- und Hosting-Plattform für Digital Humanities-Lernmaterialien.",
		);

		const ogTitle = page.locator('meta[property="og:title"]');
		await expect(ogTitle).toHaveAttribute("content", "DARIAH-Campus");

		const ogDescription = page.locator('meta[property="og:description"]');
		await expect(ogDescription).toHaveAttribute(
			"content",
			"Entdeckungs- und Hosting-Plattform für Digital Humanities-Lernmaterialien.",
		);

		const ogUrl = page.locator('meta[property="og:url"]');
		await expect(ogUrl).toHaveAttribute(
			"content",
			String(createUrl({ baseUrl: env.NEXT_PUBLIC_APP_BASE_URL, pathname: "/de" })),
		);

		const ogLocale = page.locator('meta[property="og:locale"]');
		await expect(ogLocale).toHaveAttribute("content", "de");
	});
});

test.describe("adds json+ld metadata", () => {
	test("with en locale", async ({ page }) => {
		await page.goto("/en");

		await expect(page.locator('script[type="application/ld+json"]')).toHaveText(
			'{"@context":"https://schema.org","@type":"WebSite","name":"DARIAH-Campus","description":"Discovery framework and hosting platform for digital humanities learning resources."}',
		);
	});

	test("with de locale", async ({ page }) => {
		await page.goto("/en");

		await expect(page.locator('script[type="application/ld+json"]')).toHaveText(
			'{"@context":"https://schema.org","@type":"WebSite","name":"DARIAH-Campus","description":"Entdeckungs- und Hosting-Plattform für Digital Humanities-Lernmaterialien."}',
		);
	});
});

test("serves an open-graph image", async ({ request }) => {
	for (const locale of locales) {
		const response = await request.get(`/${locale}/opengraph-image.png`);
		const status = response.status();

		expect(status).toEqual(200);
	}
});
