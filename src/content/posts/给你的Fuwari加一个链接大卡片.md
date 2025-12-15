---
title: 给你的Fuwari加一个链接大卡片
published: 2025-08-16
description: 注意:本文章修改文件部分为AI所写。这篇文章介绍了如何在Astro博客中实现自定义之类的第三方链接卡片功能。文章分为示例和添加教程两部分。
tags: [大卡片, Link Card, Markdown]
category: 大卡片
draft: false
customSlug: "30"
image: https://cdn.fis.ink/cdn/2025/08/24/68aaa7a9908f2.webp
---
> # 25.8.26更新
> ### 更改了部分UI

:::tip
由于我没有实力，本篇文章修改文件部分为AI所写
:::

:::caution
修改文件前请注意备份，防止修改失败无法回退
:::

# 前言

今天在看liushen大佬文章时看到了个大卡片效果，感觉挺好看的，于是让AI给我加上了

::link-card{url="https://blog.liushen.fun/posts/aae6fd55/" title="清羽飞扬" description="循一缕风，入山偷得夏日凉" icon="https://blog.liushen.fun/info/avatar.ico"}

# 示例

## 自定义标题和描述

```markdown
::link-card{url="https://www.fis.ink" title="fishcpy的主页" description="fishcpy的个人主页"}
```

::link-card{url="https://www.fis.ink" title="fishcpy的主页" description="fishcpy的个人主页"}

## 带图片的链接卡片

```markdown
::link-card{url="https://www.fis.ink" title="fishcpy的主页" description="fishcpy的个人主页" icon="https://github.com/github.png"}
```

::link-card{url="https://www.fis.ink" title="fishcpy的主页" description="fishcpy的个人主页" image="https://file.fis.ink/img/fishcpy/logo.png"}

## 自定义图标的链接卡片

```markdown
::link-card{url="https://www.fis.ink" title="fishcpy的主页" description="fishcpy的个人主页" icon="https://file.fis.ink/img/fishcpy/logo.png"}
```

::link-card{url="https://www.fis.ink" title="fishcpy的主页" description="fishcpy的个人主页" icon="https://file.fis.ink/img/fishcpy/logo.png"}

## 最终效果

```markdown
::link-card{url="https://www.fis.ink" title="fishcpy的主页" description="fishcpy的个人主页" icon="https://file.fis.ink/img/fishcpy/logo.png" image="https://file.fis.ink/img/fishcpy/logo.png"}
```

::link-card{url="https://www.fis.ink" title="fishcpy的主页" description="fishcpy的个人主页" icon="https://file.fis.ink/img/fishcpy/logo.png" image="https://file.fis.ink/img/fishcpy/logo.png"}


# 添加教程

## 再次提示

:::tip
由于我没有实力，下方内容为AI所写
:::

:::caution
修改文件前请注意备份，防止修改失败无法回退
:::

### 1. 创建组件文件

首先，在 `src/plugins/` 目录下创建 `rehype-component-link-card.mjs` 文件：

```javascript
/// <reference types="mdast" />
import { h } from "hastscript";

/**
 * Creates a Link Card component for third-party links.
 */
export function LinkCardComponent(properties, children) {
	if (Array.isArray(children) && children.length !== 0)
		return h("div", { class: "hidden" }, [
			'Invalid directive. ("link-card" directive must be leaf type "::link-card{url="https://example.com"}"))',
		]);

	if (!properties.url || !properties.url.startsWith('http'))
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
	const cardUuid = `LC${Math.random().toString(36).slice(-6)}`;

	// Extract domain from URL for display
	const domain = new URL(url).hostname;

	// Use custom icon if provided, otherwise use Google favicon service
	const iconUrl = customIcon || `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
	const nFavicon = h(`div#${cardUuid}-favicon`, { 
		class: "lc-favicon",
		style: `background-image: url(${iconUrl})` 
	});

	// 隐藏域名显示的标题栏
	const nTitle = h("div", { class: "lc-titlebar" }, [
		h("div", { class: "lc-titlebar-left" }, [
			// h("div", { class: "lc-site" }, domain), // 已注释掉域名显示
		]),
		h("div", { class: "lc-external-icon" }),
	]);

	const nCardTitle = h(
		`div#${cardUuid}-title`,
		{ class: "lc-card-title" },
		customTitle || "Link",
	);

	const nDescription = h(
		`div#${cardUuid}-description`,
		{ class: "lc-description" },
		customDescription || "Click to visit",
	);

	const nImage = h(
		`div#${cardUuid}-image`,
		{ class: "lc-image" },
		customImage ? h("img", { src: customImage, alt: "Link preview" }) : null
	);

	// Only fetch metadata if custom data is not provided
	const needsFetch = !customTitle || !customDescription;
	
	const nScript = needsFetch ? h(
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
				console.log("[LINK-CARD] Loaded card for ${url} | ${cardUuid}.");
			} catch (err) {
				const c = document.getElementById('${cardUuid}-card');
				c?.classList.add("fetch-error");
				console.warn("[LINK-CARD] (Error) Loading card for ${url} | ${cardUuid}.");
			}
		`,
	) : null;

	// Set data attributes for custom content
	if (customTitle) {
		nCardTitle.properties['data-has-custom-title'] = 'true';
	}
	if (customDescription) {
		nDescription.properties['data-has-custom-desc'] = 'true';
	}

	const cardContent = [
		nTitle,
		nCardTitle,
		nDescription,
	];

	if (customImage) {
		cardContent.push(nImage);
	}

	if (nScript) {
		cardContent.push(nScript);
	}

	return h(
		`a#${cardUuid}-card`,
		{
			class: needsFetch ? "card-link fetch-waiting no-styling" : "card-link no-styling",
			href: url,
			target: "_blank",
			rel: "noopener noreferrer",
			'data-url': url,
		},
		cardContent,
	);
}
```

### 2. 添加CSS样式

在 `src/styles/markdown-extend.styl` 文件中添加以下样式：

```stylus
// Link Card Styles
a.card-link
  display: block
  text-decoration: none
  border: 1px solid var(--line-divider)
  border-radius: 8px
  padding: 16px
  margin: 16px 0
  background-color: var(--card-bg)
  transition: all 0.2s ease
  position: relative
  overflow: hidden
  color: inherit

  &:hover
    background-color: var(--btn-regular-bg-hover)

    .lc-titlebar
      .lc-external-icon
        opacity: 1

  &:active
    transform: translateY(0)
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1)

  // 隐藏标题栏以移除域名显示和空白区域
  .lc-titlebar
    display: none

    .lc-titlebar-left
      display: flex
      align-items: center

    .lc-site
      display: flex
      align-items: center
      gap: 8px

    .lc-favicon
      width: 16px
      height: 16px
      background-size: contain
      background-repeat: no-repeat
      background-position: center
      flex-shrink: 0

    .lc-domain
      font-size: 14px
      color: var(--text-color-secondary)
      font-weight: 500

    .lc-external-icon
      width: 16px
      height: 16px
      opacity: 0.6
      transition: opacity 0.2s ease
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15,3 21,3 21,9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>')
      background-size: contain
      background-repeat: no-repeat
      background-position: center

  .lc-card-title
    font-size: 18px
    font-weight: 600
    color: var(--text-color-primary)
    margin-bottom: 8px
    line-height: 1.3

  .lc-description
    font-size: 14px
    color: var(--text-color-secondary)
    line-height: 1.4
    margin-bottom: 12px

  // 移除图片上方的空白区域
  .lc-image
    margin-top: 0
    
    img
      width: 100%
      max-height: 200px
      object-fit: cover
      border-radius: 4px

  &.fetch-waiting
    .lc-card-title, .lc-description
      animation: pulse 1.5s ease-in-out infinite

  &.fetch-error
    border-color: var(--error-color)
    background-color: var(--error-bg)

@keyframes pulse
  0%, 100%
    opacity: 1
  50%
    opacity: 0.5
```

### 3. 配置Astro

在 `astro.config.mjs` 文件中导入组件并注册：

```javascript
// 添加导入
import { LinkCardComponent } from "./src/plugins/rehype-component-link-card.mjs";

// 在 rehypeComponents 配置中添加
rehypeComponents,
{
  components: {
    github: GithubCardComponent,
    "link-card": LinkCardComponent, // 添加这一行
    note: (x, y) => AdmonitionComponent(x, y, "note"),
    // ... 其他组件
  },
},
```

### 4. 使用方法

配置完成后，你就可以在Markdown文件中使用链接卡片了：

```markdown
// 基本用法
::link-card{url="https://example.com"}

// 自定义标题和描述
::link-card{url="https://github.com" title="GitHub" description="代码托管平台"}

// 带自定义图片
::link-card{url="https://vercel.com" title="Vercel" description="部署平台" image="https://example.com/image.png"}

// 自定义图标
::link-card{url="https://github.com" title="GitHub" description="代码托管平台" icon="https://github.com/favicon.ico"}
```

### 5. 注意事项

- 确保URL以 `http://` 或 `https://` 开头
- 自定义图片建议使用合适的尺寸和格式

现在你的博客就拥有了美观的第三方链接大卡片功能！