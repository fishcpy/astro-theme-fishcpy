/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

// 从 config.ts 导入屏幕断点配置
const screensConfig = {
	sm: "768px",
	md: "1024px",
	lg: "1280px",
	xl: "1536px",
};

module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,mjs}"],
	darkMode: "class", // allows toggling dark mode manually
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
