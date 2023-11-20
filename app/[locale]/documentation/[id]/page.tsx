import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { unstable_setRequestLocale as setRequestLocale } from "next-intl/server";
import { Fragment, type ReactNode } from "react";

import { DocumentRenderer } from "@/components/content/document-renderer";
import { MainContent } from "@/components/main-content";
import { isValidLocale, type Locale } from "@/config/i18n.config";
import { reader } from "@/lib/content/reader";

interface DocumentationPageProps {
	params: {
		id: string;
		locale: Locale;
	};
}

export const dynamicParams = false;

export async function generateStaticParams(props: {
	params: Pick<DocumentationPageProps["params"], "locale">;
}): Promise<Array<Pick<DocumentationPageProps["params"], "id">>> {
	const { params } = props;

	const { locale } = params;
	const ids = await reader().collections.documentation.list();

	return ids.map((id) => {
		return { id };
	});
}

export async function generateMetadata(
	props: DocumentationPageProps,
	_parent: ResolvingMetadata,
): Promise<Metadata> {
	const { params } = props;

	const { id, locale } = params;
	const document = await reader().collections.documentation.read(id);

	if (document == null) notFound();

	const metadata: Metadata = {
		title: document.title,
	};

	return metadata;
}

export default function DocumentationPage(props: DocumentationPageProps): ReactNode {
	const { params } = props;

	const { id, locale } = params;
	if (!isValidLocale(locale)) notFound();
	setRequestLocale(locale);

	return (
		<MainContent className="container py-8">
			<Content id={id} locale={locale} />
		</MainContent>
	);
}

interface ContentProps {
	id: string;
	locale: Locale;
}

// @ts-expect-error Upstream type issue.
async function Content(props: ContentProps): Promise<ReactNode> {
	const { id, locale } = props;

	const document = await reader().collections.documentation.read(id);
	if (document == null) notFound();
	const content = document.body.code;

	return (
		<Fragment>
			<h1>{document.title}</h1>
			<div className="prose max-w-3xl">
				<DocumentRenderer content={content} />
			</div>
		</Fragment>
	);
}
