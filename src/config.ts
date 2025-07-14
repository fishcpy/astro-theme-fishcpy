import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
	CommentConfig,
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
	banner: {
		enable: true,
		src: "https://cdn.fishcpy.top/img/2025/05/05/68182abdc7d6e.png", // 相对于/src目录的路径。如果以'/'开头则表示相对于/public目录
		position: "center", // 等同于CSS的object-position属性，仅支持'top','center','bottom'。默认为'center'
		credit: {
			enable: false, // 是否显示横幅图片的版权信息
			text: "", // 要显示的版权文本
			url: "", // (可选) 原作品或艺术家页面的URL链接
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
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.Friends,
		LinkPreset.About,
		{
			name: "开往",
			url: "https://www.travellings.cn/go.html", // 内部链接不应包含基础路径，因为会自动添加
			external: true, // 显示外部链接图标并会在新标签页打开
		},
		{
			name: "监控",
			url: "https://status.fishcpy.top/status/web", // 内部链接不应包含基础路径，因为会自动添加
			external: true, // 显示外部链接图标并会在新标签页打开
		},
	],
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
    envId: 'https://fishcpy-cloud-twkioo-1-2-3-4-5-6-7-8-9-10-11-12-13.fis.ink/',
  },
}