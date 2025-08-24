/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

// 从 config.ts 导入屏幕断点配置
const screensConfig = {
	sm: "568px",
	md2: "726px",
	md: "924px",
	lg: "1400px",
	xl: "1536px",
};

module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,mjs}"],
	darkMode: "class", // allows toggling dark mode manually
	safelist: [
		// 确保动态生成的网格类名被包含在CSS中
		"grid-cols-1",
		"grid-cols-2",
		"grid-cols-3",
		"md2:grid-cols-1",
		"md2:grid-cols-2",
		"md2:grid-cols-3",
		"md:grid-cols-1",
		"md:grid-cols-2",
		"md:grid-cols-3",
		"lg:grid-cols-1",
		"lg:grid-cols-2",
		"lg:grid-cols-3",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Roboto", "sans-serif", ...defaultTheme.fontFamily.sans],
			},
			screens: screensConfig,
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
