import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("resource page", () => {
	test("should have document title", async ({ page }) => {
		await page.goto("/en/resources/test");
		await expect(page).toHaveTitle("Test | DARIAH-Campus");

		await page.goto("/de/resources/test");
		await expect(page).toHaveTitle("Test | DARIAH-Campus");
	});

	test("should not have any automatically detectable accessibility issues", async ({ page }) => {
		await page.goto("/en/resources/test");
		expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);

		await page.goto("/de/resources/test");
		expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
	});

	test.fixme("should add highwire metadata", () => {
		// TODO:
	});

	test.fixme("should add dublin core metadata", () => {
		// TODO:
	});
});
