/// <reference types="mdast" />
import { h } from "hastscript";

/**
 * Creates a Link Card component for third-party links.
 *
 * @param {Object} properties - The properties of the component.
 * @param {string} properties.url - The URL to link to.
 * @param {string} [properties.title] - Optional custom title for the card.
 * @param {string} [properties.description] - Optional custom description for the card.
 * @param {string} [properties.image] - Optional custom image URL for the card.
 * @param {string} [properties.icon] - Optional custom icon URL for the card.
 * @param {import('mdast').RootContent[]} children - The children elements of the component.
 * @returns {import('mdast').Parent} The created Link Card component.
 */
export function LinkCardComponent(properties, children) {
	if (Array.isArray(children) && children.length !== 0)
		return h("div", { class: "hidden" }, [
			'Invalid directive. ("link-card" directive must be leaf type "::link-card{url="https://example.com"}")',
		]);

	if (!properties.url || !properties.url.startsWith("http"))
		return h(
			"div",
			{ class: "hidden" },
			'Invalid URL. ("url" attribute must be a valid HTTP/HTTPS URL)',
		);

	const url = properties.url;
	const customTitle = properties.title;
	const customDescription = properties.description;
	const customImage = properties.image;
	const customIcon = properties.icon;
	const cardUuid = `LC${Math.random().toString(36).slice(-6)}`; // Collisions are not important

	// Extract domain from URL for display
	const domain = new URL(url).hostname;

	// Use custom icon if provided, otherwise use Google favicon service
	const iconUrl =
		customIcon || `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
	const nFavicon = h(`div#${cardUuid}-favicon`, {
		class: "lc-favicon",
		style: `background-image: url(${iconUrl})`,
	});

	const nTitle = h("div", { class: "lc-titlebar" }, [
		h("div", { class: "lc-titlebar-left" }, [
			// 隐藏域名显示
		]),
		h("div", { class: "lc-external-icon" }),
	]);

	const nCardTitle = h(
		`div#${cardUuid}-title`,
		{ class: "lc-card-title" },
		customTitle || "Loading...",
	);

	const nDescription = h(
		`div#${cardUuid}-description`,
		{ class: "lc-description" },
		customDescription || "Loading description...",
	);

	const nImage = h(
		`div#${cardUuid}-image`,
		{ class: "lc-image" },
		customImage ? h("img", { src: customImage, alt: "Link preview" }) : null,
	);

	// Only fetch metadata if custom data is not provided
	const needsFetch = !customTitle || !customDescription;

	const nScript = needsFetch
		? h(
				`script#${cardUuid}-script`,
				{ type: "text/javascript", defer: true },
				`
			// Simple metadata extraction for link cards
			try {
				const cardElement = document.getElementById('${cardUuid}-card');
				const titleElement = document.getElementById('${cardUuid}-title');
				const descElement = document.getElementById('${cardUuid}-description');
				
				// Set default values if custom ones weren't provided
				if (!titleElement.dataset.hasCustomTitle) {
					titleElement.innerText = 'Link';
				}
				if (!descElement.dataset.hasCustomDesc) {
					descElement.innerText = 'Click to visit';
				}
				
				cardElement.classList.remove("fetch-waiting");
			} catch (err) {
				const c = document.getElementById('${cardUuid}-card');
				c?.classList.add("fetch-error");
			}
		`,
			)
		: null;

	// Set data attributes for custom content
	if (customTitle) {
		nCardTitle.properties["data-has-custom-title"] = "true";
	}
	if (customDescription) {
		nDescription.properties["data-has-custom-desc"] = "true";
	}

	// 创建主要内容区域
	const nContentWrapper = h("div", { class: "lc-content-wrapper" }, [
		h("div", { class: "lc-icon-area" }, [nFavicon]),
		h("div", { class: "lc-text-area" }, [nTitle, nCardTitle, nDescription])
	]);

	const cardContent = [nContentWrapper];

	if (customImage) {
		cardContent.push(nImage);
	}

	if (nScript) {
		cardContent.push(nScript);
	}

	return h(
		`a#${cardUuid}-card`,
		{
			class: needsFetch
				? "card-link fetch-waiting no-styling"
				: "card-link no-styling",
			href: url,
			target: "_blank",
			rel: "noopener noreferrer",
			"data-url": url,
		},
		cardContent,
	);
}
