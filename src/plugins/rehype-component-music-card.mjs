/// <reference types="mdast" />
import { h } from "hastscript";

/**
 * Creates a Music Card component using APlayer and MetingJS.
 *
 * @param {Object} properties - The properties of the component.
 * @param {string} properties.server - Music platform (netease, tencent, kugou, xiami, baidu).
 * @param {string} properties.type - Content type (song, playlist, album, search, artist).
 * @param {string} properties.id - Music ID from the platform.
 * @param {boolean} [properties.mini] - Enable mini mode (default: false).
 * @param {boolean} [properties.fixed] - Enable fixed mode (default: false).
 * @param {boolean} [properties.autoplay] - Enable autoplay (default: false).
 * @param {string} [properties.theme] - Player theme color (default: #2980b9).
 * @param {string} [properties.loop] - Loop mode (all, one, none) (default: all).
 * @param {string} [properties.order] - Play order (list, random) (default: list).
 * @param {number} [properties.volume] - Volume (0-1) (default: 0.7).
 * @param {boolean} [properties.mutex] - Prevent multiple players (default: true).
 * @param {boolean} [properties.listFolded] - Fold playlist (default: false).
 * @param {string} [properties.listMaxHeight] - Max height of playlist (default: 340px).
 * @param {import('mdast').RootContent[]} children - The children elements of the component.
 * @returns {import('mdast').Parent} The created Music Card component.
 */
export function MusicCardComponent(properties, children) {
	if (Array.isArray(children) && children.length !== 0)
		return h("div", { class: "hidden" }, [
			'Invalid directive. ("music" directive must be leaf type "::music{server="netease" type="song" id="123456"}")',
		]);

	if (!properties.server || !properties.type || !properties.id)
		return h(
			"div",
			{ class: "hidden" },
			'Invalid parameters. ("server", "type", and "id" attributes are required)',
		);

	const server = properties.server;
	const type = properties.type;
	const id = properties.id;
	const mini = properties.mini === "true" || properties.mini === true;
	const fixed = properties.fixed === "true" || properties.fixed === true;
	const autoplay = properties.autoplay === "true" || properties.autoplay === true;
	const theme = properties.theme || "#2980b9";
	const loop = properties.loop || "all";
	const order = properties.order || "list";
	const volume = properties.volume || "0.7";
	const mutex = properties.mutex !== "false" && properties.mutex !== false;
	const listFolded = properties.listFolded === "true" || properties.listFolded === true;
	const listMaxHeight = properties.listMaxHeight || "340px";

	const cardUuid = `MC${Math.random().toString(36).slice(-6)}`;

	// Validate server and type
	const validServers = ["netease", "tencent", "kugou", "xiami", "baidu"];
	const validTypes = ["song", "playlist", "album", "search", "artist"];

	if (!validServers.includes(server))
		return h(
			"div",
			{ class: "hidden" },
			`Invalid server. Supported servers: ${validServers.join(", ")}`,
		);

	if (!validTypes.includes(type))
		return h(
			"div",
			{ class: "hidden" },
			`Invalid type. Supported types: ${validTypes.join(", ")}`,
		);

	// Create the meting-js element with all attributes
	const metingAttributes = {
		server: server,
		type: type,
		id: id,
		mini: mini.toString(),
		fixed: fixed.toString(),
		autoplay: autoplay.toString(),
		theme: theme,
		loop: loop,
		order: order,
		volume: volume,
		mutex: mutex.toString(),
		"list-folded": listFolded.toString(),
		"list-max-height": listMaxHeight,
		"storage-name": `metingjs-${cardUuid}`,
	};

	const nMetingPlayer = h("meting-js", metingAttributes);

	// Create container with music card styling
	const nContainer = h(
		`div#${cardUuid}-container`,
		{
			class: "card-music",
			"data-server": server,
			"data-type": type,
			"data-id": id,
		},
		[nMetingPlayer],
	);

	return nContainer;
}