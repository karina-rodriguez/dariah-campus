import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale as setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";

import { DocumentRenderer } from "@/components/content/document-renderer";
import { MainContent } from "@/components/main-content";
import { isValidLocale, type Locale } from "@/config/i18n.config";
import { reader } from "@/lib/content/reader";

interface ImprintPageProps {
	params: {
		locale: Locale;
	};
}

export async function generateMetadata(
	props: ImprintPageProps,
	_parent: ResolvingMetadata,
): Promise<Metadata> {
	const { params } = props;

	const { locale } = params;
	const t = await getTranslations({ locale, namespace: "ImprintPage" });

	const metadata: Metadata = {
		title: t("meta.title"),
	};

	return metadata;
}

export default function ImprintPage(props: ImprintPageProps): ReactNode {
	const { params } = props;

	const { locale } = params;
	if (!isValidLocale(locale)) notFound();
	setRequestLocale(locale);

	const t = useTranslations("ImprintPage");

	return (
		<MainContent className="container py-8">
			<h1>{t("title")}</h1>
			<ImprintPageContent locale={locale} />
		</MainContent>
	);
}

interface ImprintPageContentProps {
	locale: Locale;
}

// @ts-expect-error Upstream type issue.
async function ImprintPageContent(props: ImprintPageContentProps): Promise<ReactNode> {
	const { locale } = props;

	const document = await reader().singletons.imprint.read();
	const content = document.body.code;

	return (
		<div className="prose max-w-3xl">
			<DocumentRenderer content={content} />
		</div>
	);
}
