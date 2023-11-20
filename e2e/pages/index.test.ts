import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("home page", () => {
	test("should have document title", async ({ page }) => {
		await page.goto("/en");
		await expect(page).toHaveTitle("DARIAH-Campus");

		await page.goto("/de");
		await expect(page).toHaveTitle("DARIAH-Campus");
	});

	test("should not have any automatically detectable accessibility issues", async ({ page }) => {
		await page.goto("/en");
		expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);

		await page.goto("/de");
		expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
	});
});
