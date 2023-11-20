import { capitalize, isNonEmptyString } from "@acdh-oeaw/lib";
import {
	AlertTriangleIcon,
	FlameIcon,
	InfoIcon,
	LightbulbIcon,
	type LucideIcon,
	PencilIcon,
} from "lucide-react";
import type { ReactNode } from "react";

import { type VariantProps, variants } from "@/lib/variants";

const styles = variants({
	base: "rounded not-prose p-8 text-md font-medium shadow",
	variants: {
		type: {
			danger: "",
			info: "",
			note: "",
			tip: "",
			warning: "",
		},
	},
	defaultVariants: {
		type: "info",
	},
});

type StyleProps = VariantProps<typeof styles>;

const icons: Record<NonNullable<StyleProps["type"]>, LucideIcon> = {
	danger: FlameIcon,
	info: InfoIcon,
	note: PencilIcon,
	tip: LightbulbIcon,
	warning: AlertTriangleIcon,
};

interface SideNoteStyleProps {
	/** @default "info" */
	type: StyleProps["type"];
}

interface SideNoteProps extends SideNoteStyleProps {
	children: ReactNode;
	title?: string;
}

export function SideNote(props: SideNoteProps): ReactNode {
	const { children, title, type = "info" } = props;

	const heading = isNonEmptyString(title) ? title : capitalize(type);
	const Icon = icons[type];

	return (
		<aside className={styles({ type })}>
			<strong>
				<Icon className="s-5" />
				{heading}
			</strong>
			{children}
		</aside>
	);
}
