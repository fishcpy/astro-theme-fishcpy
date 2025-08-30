import { AUTO_MODE, DARK_MODE, LIGHT_MODE } from "./constants/constants";
import type {
	BeautifyConfig,
	CommentConfig,
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

// ----------------------------------------------------------

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
		enable: false,
		type: "video", // 'image' 或 'video'，指定banner类型
		src: "https://www.fis.ink/wj/video/mc.mp4", // 相对于/src目录的路径。如果以'/'开头则表示相对于/public目录
		//背景在src\layouts\Layout.astro中
		position: "center", // 等同于CSS的object-position属性，仅支持'top','center','bottom'。默认为'center'
		credit: {
			enable: true, // 是否显示横幅图片的版权信息
			text: "Steam @基里曼的蓝精灵", // 要显示的版权文本
			url: "https://steamcommunity.com/sharedfiles/filedetails/?id=3426980000", // (可选) 原作品或艺术家页面的URL链接
		},
		text: {
			enable: true, // 是否在banner中显示文字
			title: "Hello👋", // banner主标题
			subtitle: "Welcome to my blog", // banner副标题
		},
	},
	pageBackground: {
		enable: true,
		type: "image", // 'image' 或 'video'
		src: "https://api.fis.ink/mc",
		//https://www.fis.ink/wj/video/mc.mp4
		//https://www.fis.ink/wj/video/xingjianya.mp4
	},
	toc: {
		enable: true, // 在文章右侧显示目录
		depth: 2, // 目录中显示的最大标题层级，取值范围1-3
	},
	post: {
		showCover: false, // 是否在文章页面显示封面
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

// ----------------------------------------------------------

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
					name: "相册",
					url: "/album/",
					icon: "material-symbols:photo-library",
				},
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
	],
	showHomeIcon: false, // 控制是否显示home图标
	searchLeftIcons: [
		{
			name: "travellings",
			url: "https://www.travellings.cn/go.html",
			icon: "fa6-solid:train-subway",
			external: true,
		},
		{
			name: "rss",
			url: "/rss.xml",
			icon: "ic:twotone-rss-feed",
			external: true,
		},
	],
};

// ----------------------------------------------------------

export const profileConfig: ProfileConfig = {
	avatar: "https://www.fis.ink/img/logo.png", // 相对于/src目录的路径。如果以'/'开头则表示相对于/public目录
	name: "fishcpy",
	bio: "非淡泊无以明志，非宁静无以致远",
	links: [
		{
			name: "Rss",
			icon: "ic:twotone-rss-feed",
			// 图标代码请访问 https://icones.js.org/
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

// ----------------------------------------------------------

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

// ----------------------------------------------------------

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// 注意：某些样式(如背景色)会被覆盖，请查看astro.config.mjs文件
	// 请选择深色主题，因为当前博客主题仅支持深色背景
	theme: "github-dark",
};

// ----------------------------------------------------------

export const commentConfig: CommentConfig = {
	enable: true,
	type: "artalk",
	twikoo: {
		envId:
			"https://fishcpy-cloud-twkioo-1-2-3-4-5-6-7-8-9-10-11-12-13.fis.ink/",
	},
	artalk: {
		server: "https://artalk.fis.ink",
		site: "fishcpy的小破站",
		darkMode: "auto", // 根据全局主题自动切换
	},
};

// ----------------------------------------------------------

//不生效就去改 /tailwind.config.cjs
export const screensConfig = {
	sm: "768px",
	md2: "726px",
	md: "924px",
	lg: "1400px",
	xl: "1536px",
};

// ----------------------------------------------------------

export const cardConfig = {
	opacity: 0.85, // 卡片半透明度，取值范围0-1
};

// ----------------------------------------------------------

export const layoutConfig = {
	postList: {
		type: "grid", // "grid" 或 "list"，网格布局或列表布局
		grid: {
			columns: {
				sm: 1, // 小屏幕列数
				md2: 2, // 726px以上显示2列
				md: 2, // 中屏幕列数
				lg: 3, // 大屏幕列数，最大为3，超出会变成2个每行
			},
			gap: "gap-4", // 网格间距，对应Tailwind的gap-4
		},
	},
	friends: {
		grid: {
			columns: {
				sm: 1, // 小屏幕列数
				md: 2, // 中屏幕列数
				lg: 3, // 大屏幕列数
			},
			gap: "gap-x-6 gap-y-8", // 网格间距
		},
	},
};

// 使用示例：
// 1. 网格布局：type: "grid"
// 2. 列表布局：type: "list"
// 3. 自定义网格列数：修改 columns 中的 sm/md/lg 值
// 4. 调整间距：修改 gap 值（1-12）

// ----------------------------------------------------------

//好像不可用
export const beautifyConfig: BeautifyConfig = {
	enable: true,
	field: "post",
	titlePrefixIcon: "\uf863",
	titlePrefixIconColor: "#ff7849",
	animation: {
		enable: true,
		speed: 1.6,
		direction: "counterclockwise",
		rotate: true,
	},
	hover: {
		enable: true,
		slowSpeed: 3.2,
		color: "#49b1f5",
	},
	colors: {
		h1: "#ef50a8",
		h2: "#fb7061",
		h3: "#ffbf00",
		h4: "#a9e000",
		h5: "#57c850",
		h6: "#5ec1e0",
	},
	sizes: {
		h1: "1.3rem",
		h2: "1.1rem",
		h3: "0.95rem",
		h4: "0.8rem",
		h5: "0.7rem",
		h6: "0.66rem",
	},
};
