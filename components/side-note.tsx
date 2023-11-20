import { capitalize } from "@acdh-oeaw/lib";
import {
	AlertTriangleIcon,
	CloudLightningIcon,
	InfoIcon,
	LightbulbIcon,
	type LucideIcon,
	PencilIcon,
} from "lucide-react";
import type { ReactNode } from "react";

import { type VariantProps, variants } from "@/lib/variants";

const styles = variants({
	base: "rounded my-6 space-y-3 border-l-4 px-8 py-4",
	variants: {
		type: {
			danger: "bg-negative-50 border-negative-600 text-negative-800",
			info: "bg-informative-50 border-informative-600 text-informative-800",
			note: "border-neutral-600 bg-neutral-50 text-neutral-800",
			tip: "bg-positive-50 border-positive-600 text-positive-800",
			warning: "bg-notice-50 border-notice-500 text-notice-800",
		},
	},
	defaultVariants: {
		type: "note",
	},
});

type SideNoteStyleProps = VariantProps<typeof styles>;

const icons: Record<NonNullable<SideNoteStyleProps["type"]>, LucideIcon> = {
	danger: CloudLightningIcon,
	info: InfoIcon,
	note: PencilIcon,
	tip: LightbulbIcon,
	warning: AlertTriangleIcon,
};

interface SideNoteProps {
	children: ReactNode;
	title?: string;
	/** @default "note" */
	type?: SideNoteStyleProps["type"];
}

export function SideNote(props: SideNoteProps): ReactNode {
	const { children, title: _title, type = "note" } = props;

	const Icon = icons[type];
	const title = _title ?? capitalize(type);

	return (
		<aside className={styles({ type })}>
			<strong className="flex items-center gap-x-2 font-bold">
				<Icon className="h-5 w-5 shrink-0" />
				<span>{title}</span>
			</strong>
			<div>{children}</div>
		</aside>
	);
}
