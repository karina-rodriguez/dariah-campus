/** @typedef {import('next').NextConfig} NextConfig */

import { log } from "@acdh-oeaw/lib";
import createBundleAnalyzer from "@next/bundle-analyzer";
import createMdxPlugin from "@next/mdx";
import { createContentlayerPlugin } from "next-contentlayer";
import createI18nPlugin from "next-intl/plugin";
import withFrontmatter from "remark-frontmatter";
import withGfm from "remark-gfm";
import withMdxFrontmatter from "remark-mdx-frontmatter";

import { env } from "./config/env.config.js";

/** @type {NextConfig} */
const config = {
	eslint: {
		dirs: [process.cwd()],
		ignoreDuringBuilds: true,
	},
	headers() {
		/** @type {Awaited<ReturnType<NonNullable<NextConfig['headers']>>>} */
		const headers = [];

		/**
		 * Only allow indexing by search engines when the `BOTS` environment variable is set.
		 */
		if (env.BOTS !== "enabled") {
			headers.push({
				source: "/:path*",
				headers: [
					{
						key: "X-Robots-Tag",
						value: "noindex, nofollow",
					},
				],
			});

			if (env.NODE_ENV === "production") {
				log.warn("Indexing by search engines is disallowed.");
			}
		}

		return Promise.resolve(headers);
	},
	output: env.BUILD_MODE,
	pageExtensions: ["ts", "tsx", "md", "mdoc", "mdx"],
	typescript: {
		ignoreBuildErrors: true,
	},
	webpack(config) {
		/**
		 * Caused by `contentlayer`.
		 *
		 * @see https://github.com/vercel/next.js/discussions/30870
		 */
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		config.infrastructureLogging = { level: "error" };

		/**
		 * @see https://github.com/antfu/shikiji/issues/13#issuecomment-1749588964
		 * @see https://github.com/vercel/next.js/pull/58572
		 */
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
		config.module.rules.push({
			test: /\.m?js$/,
			type: "javascript/auto",
			resolve: {
				fullySpecified: false,
			},
		});

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return config;
	},
};

/** @type {Array<(config: NextConfig) => NextConfig>} */
const plugins = [
	createBundleAnalyzer({ enabled: env.BUNDLE_ANALYZER === "enabled" }),
	createI18nPlugin("./lib/i18n.ts"),
	createMdxPlugin({
		extension: /\.(md|mdx)$/,
		options: {
			remarkPlugins: [withFrontmatter, withMdxFrontmatter, withGfm],
		},
	}),
	createContentlayerPlugin(),
];

export default plugins.reduce((config, plugin) => {
	return plugin(config);
}, config);
