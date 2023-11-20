import type { MDXComponents } from "mdx/types";

// import { CodeBlock } from "@/components/code-block";
import { SideNote } from "@/components/side-note";
import { Link } from "@/lib/navigation";

const shared = {
	a: Link,
	// Carousel,
	// Download,
	// Figure,
	// Quiz,
	SideNote,
	// Tab,
	// Tabs,
	// Video,
} as MDXComponents;

export function useMDXComponents(components?: MDXComponents): MDXComponents {
	return {
		...shared,
		...components,
	};
}
