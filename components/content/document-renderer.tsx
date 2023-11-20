import { useMDXComponent } from "next-contentlayer/hooks";
import type { ReactNode } from "react";

import { useMDXComponents } from "@/mdx-components";

interface DocumentRendererProps {
	content: string;
}

export function DocumentRenderer(props: DocumentRendererProps): ReactNode {
	const { content } = props;

	const Content = useMDXComponent(content);
	const components = useMDXComponents();

	return <Content components={components} />;
}
