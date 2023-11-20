import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("documentation page", () => {
	test("should have document title", async ({ page }) => {
		await page.goto("/en/documentation/about");
		await expect(page).toHaveTitle("About | DARIAH-Campus");

		await page.goto("/de/documentation/about");
		await expect(page).toHaveTitle("Über das Projekt | DARIAH-Campus");
	});

	test("should not have any automatically detectable accessibility issues", async ({ page }) => {
		await page.goto("/en/documentation/about");
		expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);

		await page.goto("/de/documentation/about");
		expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
	});
});
