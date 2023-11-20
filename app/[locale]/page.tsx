import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale as setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";

import { DocumentRenderer } from "@/components/content/document-renderer";
import { MainContent } from "@/components/main-content";
import { isValidLocale, type Locale } from "@/config/i18n.config";
import { reader } from "@/lib/content/reader";

interface IndexPageProps {
	params: {
		locale: Locale;
	};
}

export async function generateMetadata(
	props: IndexPageProps,
	_parent: ResolvingMetadata,
): Promise<Metadata> {
	const { params } = props;

	const { locale } = params;
	const _t = await getTranslations({ locale, namespace: "IndexPage" });

	const metadata: Metadata = {
		/**
		 * Fall back to `title.default` from `layout.tsx`.
		 *
		 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#title
		 */
		// title: undefined,
	};

	return metadata;
}

export default function IndexPage(props: IndexPageProps): ReactNode {
	const { params } = props;

	const { locale } = params;
	if (!isValidLocale(locale)) notFound();
	setRequestLocale(locale);

	const t = useTranslations("IndexPage");

	return (
		<MainContent className="container py-8">
			<h1>{t("title")}</h1>
			<IndexPageContent locale={locale} />
		</MainContent>
	);
}

interface IndexPageContentProps {
	locale: Locale;
}

// @ts-expect-error Upstream type issue.
async function IndexPageContent(props: IndexPageContentProps): Promise<ReactNode> {
	const { locale } = props;

	const document = await reader().singletons.home.read();
	const content = document.body.code;

	return (
		<div className="prose max-w-3xl">
			<DocumentRenderer content={content} />
		</div>
	);
}
