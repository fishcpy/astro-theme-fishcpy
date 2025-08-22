import { AUTO_MODE, DARK_MODE, LIGHT_MODE } from "./constants/constants";
import type {
	CommentConfig,
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "fishcpy的小破站",
	subtitle: "",
	lang: "zh_CN", // 可选值: 'en', 'zh_CN', 'zh_TW', 'ja', 'ko', 'es', 'th'
	themeColor: {
		hue: 260, // 主题色默认色调，取值范围0-360。例如红色:0，蓝绿色:200，青色:250，粉色:345
		fixed: true, // 对访客隐藏主题色选择器
	},
	theme: DARK_MODE, // 主题模式: AUTO_MODE(默认), LIGHT_MODE(强制浅色), DARK_MODE(强制深色)
	banner: {
		enable: true,
		src: "https://api.fis.ink/mc", // 相对于/src目录的路径。如果以'/'开头则表示相对于/public目录
		//背景在src\layouts\Layout.astro中
		position: "center", // 等同于CSS的object-position属性，仅支持'top','center','bottom'。默认为'center'
		credit: {
			enable: false, // 是否显示横幅图片的版权信息
			text: "", // 要显示的版权文本
			url: "", // (可选) 原作品或艺术家页面的URL链接
		},
		text: {
			enable: true, // 是否在banner中显示文字
			title: "非淡泊无以明志，非宁静无以致远", // banner主标题
			subtitle: "Welcome to my blog", // banner副标题
		},
	},
	toc: {
		enable: true, // 在文章右侧显示目录
		depth: 2, // 目录中显示的最大标题层级，取值范围1-3
	},
	favicon: [
		// 保留空数组则使用默认favicon
		{
			src: "https://www.fis.ink/img/logo_c.png", // favicon路径，相对于/public目录
			//theme: 'light',              // (可选) 'light'或'dark'，仅在为浅色和深色模式设置了不同favicon时使用
			//sizes: '32x32',              // (可选) favicon尺寸，仅在设置了不同尺寸的favicon时使用
		},
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		{
			name: "归档",
			url: "/archive/",
			icon: "fa6-solid:box-archive",
		},
		{
			name: "友链",
			url: "#",
			icon: "fa6-solid:link",
			children: [
				{
					name: "友链",
					url: "/friends/",
					icon: "fa6-solid:user-group",
				},
				{
					name: "朋友圈",
					url: "/circle/",
					icon: "fa6-solid:circle-nodes",
				},
				{
					name: "留言板",
					url: "/comments/",
					icon: "fa6-solid:message",
				},
			],
		},
		{
			name: "其他",
			url: "#",
			icon: "fa6-solid:chart-line",
			children: [
				{
					name: "服务监控",
					url: "https://status.fishcpy.top/status/web",
					external: true,
					icon: "fa6-solid:chart-line",
				},
				{
					name: "节点监控",
					url: "https://node.fishcpy.top",
					external: true,
					icon: "fa6-solid:chart-line",
				},
			],
		},
		{
			name: "我的",
			url: "#",
			icon: "fa6-solid:user",
			children: [
				{
					name: "瞬间",
					url: "/essay/",
					icon: "material-symbols:photo-camera",
				},
				{
					name: "时间盒",
					url: "/chronobox/",
					icon: "fa6-solid:circle-play",
				},
				{
					name: "关于",
					url: "/about/",
					icon: "fa6-solid:user",
				},
				{
					name: "主页",
					url: "https://www.fis.ink",
					external: true,
					icon: "material-symbols:home",
				},
			],
		},
		{
			name: "开往",
			url: "https://www.travellings.cn/go.html",
			external: true,
			icon: "fa6-solid:train-subway",
		},
	],
	showHomeIcon: false, // 控制是否显示home图标
};

export const profileConfig: ProfileConfig = {
	avatar: "https://www.fis.ink/img/logo.png", // 相对于/src目录的路径。如果以'/'开头则表示相对于/public目录
	name: "fishcpy",
	bio: "非淡泊无以明志，非宁静无以致远",
	links: [
		{
			name: "Rss",
			icon: "ic:twotone-rss-feed", // 图标代码请访问 https://icones.js.org/
			// 如果尚未包含相应的图标集，您需要先安装
			// `pnpm add @iconify-json/<icon-set-name>`
			url: "/rss.xml",
		},
		{
			name: "Steam",
			icon: "fa6-brands:steam",
			url: "https://steamcommunity.com/id/fishcpy",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/fishcpy",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// 注意：某些样式(如背景色)会被覆盖，请查看astro.config.mjs文件
	// 请选择深色主题，因为当前博客主题仅支持深色背景
	theme: "github-dark",
};

export const commentConfig: CommentConfig = {
	twikoo: {
		envId:
			"https://fishcpy-cloud-twkioo-1-2-3-4-5-6-7-8-9-10-11-12-13.fis.ink/",
	},
};
