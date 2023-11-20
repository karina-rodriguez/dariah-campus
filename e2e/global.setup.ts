import { test as setup } from "@playwright/test";

import { env } from "@/config/env.config";

if (env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID) {
	const baseUrl = "https://www.google-analytics.com/collect/**";

	setup.beforeEach("block requests to analytics service", async ({ context }) => {
		await context.route(baseUrl, (route) => {
			return route.fulfill({ status: 204, body: "" });
		});
	});
}
