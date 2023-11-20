import { expect, test } from "@playwright/test";

import { env } from "@/config/env.config";

if (env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID) {
	const baseUrl = "https://www.google-analytics.com/collect/**";

	test.describe("analytics service", () => {
		test("should track page views", async ({ page }) => {
			const initialResponsePromise = page.waitForResponse(baseUrl);
			await page.goto("/en");
			const initialResponse = await initialResponsePromise;
			expect(initialResponse.status()).toBe(204);

			const responsePromise = page.waitForResponse(baseUrl);
			await page.getByRole("link", { name: "Imprint" }).click();
			const response = await responsePromise;
			expect(response.status()).toBe(204);
		});
	});
}
