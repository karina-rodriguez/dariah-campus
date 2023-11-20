"use client";

import Script from "next/script";
import { Fragment, type ReactNode, useEffect, useState } from "react";

import { usePathname } from "@/lib/navigation";

declare global {
	interface Window {
		gtag?: (...args: Array<unknown>) => void;
	}
}

function createService(id: string | undefined) {
	if (id == null) return null;

	return {
		registerPageView(url: string) {
			window.gtag?.("event", "page_view", { page_path: url });
		},
		optIn() {
			// @ts-expect-error Property used by gtag.
			window[`ga-disable-${id}`] = false;
			window.gtag?.("consent", "update", { analytics_storage: "granted" });
		},
		optOut() {
			// @ts-expect-error Property used by gtag.
			window[`ga-disable-${id}`] = true;
			window.gtag?.("consent", "update", { analytics_storage: "denied" });
		},
	};
}

interface AnalyticsProps {
	id: string | undefined;
}

export function Analytics(props: AnalyticsProps): ReactNode {
	const { id } = props;

	const [service] = useState(() => createService(id));
	// TODO: useConsent()
	const pathname = usePathname();

	useEffect(() => {
		service?.registerPageView(pathname);
	}, [service, pathname]);

	if (id == null) return null;

	return (
		<Fragment>
			<Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />
			<Script
				id="google-analytics"
				dangerouslySetInnerHTML={{
					__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window['ga-disable-${id}'] = true;
            gtag('js', new Date());
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied'
            });
            gtag('config', '${id}', {
              'transport_type': 'beacon',
              'anonymize_ip': true,
            });
          `,
				}}
			/>
		</Fragment>
	);
}
