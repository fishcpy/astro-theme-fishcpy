import type { AUTO_MODE, DARK_MODE, LIGHT_MODE } from "@constants/constants";

export type SiteConfig = {
	title: string;
	subtitle: string;

	lang: string;

	themeColor: {
		hue: number;
		fixed: boolean;
	};
	theme: LIGHT_DARK_MODE;
	banner: {
		enable: boolean;
		type?: "image" | "video";
		src: string;
		position?: "top" | "center" | "bottom";
		credit: {
			enable: boolean;
			text: string;
			url?: string;
		};
		text?: {
			enable: boolean;
			title?: string;
			subtitle?: string;
		};
	};
	pageBackground: {
		enable: boolean;
		type: "image" | "video";
		src: string;
	};
	toc: {
		enable: boolean;
		depth: 1 | 2 | 3;
	};
	post: {
		showCover: boolean;
	};

	favicon: Favicon[];
};

export type Favicon = {
	src: string;
	theme?: "light" | "dark";
	sizes?: string;
};

export enum LinkPreset {
	Home = 0,
	Archive = 1,
	About = 2,
	Friends = 3,
	Moments = 4,
}

export type NavBarLink = {
	name: string;
	url: string;
	external?: boolean;
	icon?: string;
	children?: NavBarLink[];
};

export type NavBarConfig = {
	links: (NavBarLink | LinkPreset)[];
	showHomeIcon?: boolean;
	searchLeftIcons?: {
		name: string;
		url: string;
		icon: string;
		external?: boolean;
	}[];
};

export type ProfileConfig = {
	avatar?: string;
	name: string;
	bio?: string;
	links: {
		name: string;
		url: string;
		icon: string;
	}[];
	showStats?: boolean; // 统计信息总开关
	statsConfig?: {
		showPosts?: boolean; // 是否显示文章数
		showTags?: boolean; // 是否显示标签数
		showCategories?: boolean; // 是否显示分类数
	};
};

export type LicenseConfig = {
	enable: boolean;
	name: string;
	url: string;
};

export type CommentConfig = {
	enable: boolean;
	type: "twikoo" | "artalk";
	twikoo?: TwikooConfig;
	artalk?: ArtalkConfig;
};

type TwikooConfig = {
	envId: string;
	region?: string;
	lang?: string;
};

type ArtalkConfig = {
	server: string;
	site: string;
	pageKey?: string;
	pageTitle?: string;
	darkMode?: boolean | "auto";
	useBackendConf?: boolean;
	customCSS?: string;
};

export type LIGHT_DARK_MODE =
	| typeof LIGHT_MODE
	| typeof DARK_MODE
	| typeof AUTO_MODE;

export type BlogPostData = {
	body: string;
	title: string;
	published: Date;
	description: string;
	tags: string[];
	draft?: boolean;
	image?: string;
	category?: string;
	prevTitle?: string;
	prevSlug?: string;
	nextTitle?: string;
	nextSlug?: string;
};

export type ExpressiveCodeConfig = {
	theme: string;
};

export type BeautifyConfig = {
	enable: boolean;
	field: "post" | "site";
	titlePrefixIcon: string;
	titlePrefixIconColor: string;
	animation?: {
		enable: boolean;
		speed: number;
		direction: "clockwise" | "counterclockwise";
		rotate: boolean;
	};
	hover?: {
		enable: boolean;
		slowSpeed: number;
		color: string;
	};
	colors?: {
		h1: string;
		h2: string;
		h3: string;
		h4: string;
		h5: string;
		h6: string;
	};
	sizes?: {
		h1: string;
		h2: string;
		h3: string;
		h4: string;
		h5: string;
		h6: string;
	};
};

export type SidebarConfig = {
	enable: boolean; // 侧边栏总开关，控制整个侧边栏是否显示
	cards: {
		profile: boolean; // 个人资料卡片
		categories: boolean; // 分类卡片
		tags: boolean; // 标签卡片
		hitokoto: boolean; // 一言卡片
		advertisement: boolean; // 广告卡片
	};
	advertisement: {
		src: string; // 广告图片链接
		url: string; // 广告跳转链接
		alt: string; // 图片alt文本
		showLabel: boolean; // 是否显示广告标识
		labelText: string; // 广告标识文本
	};
};

// 朋友圈配置类型
export type CircleConfig = {
	dataSource: {
		url: string; // 朋友圈数据API地址
		timeout: number; // 请求超时时间(毫秒)，默认10秒
	};
	display: {
		articlesPerPage: number; // 每页显示文章数量
		showAvatar: boolean; // 是否显示作者头像
		showAuthor: boolean; // 是否显示作者名称
		dateFormat: string; // 日期格式，默认'YYYY-MM-DD HH:mm'
		enablePagination: boolean; // 是否启用分页
	};
};

// 鼠标样式配置
export const cursorConfig = {
	overrideDefault: true, // 是否覆盖访问者系统默认鼠标样式 (false=尊重用户设置, true=强制覆盖)
};
