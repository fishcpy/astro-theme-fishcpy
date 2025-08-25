---
title: trae AI 编辑器SOLO模式貌似会注入广告
published: 2025-08-18
description: trae AI 编辑器SOLO模式默认提示词貌似会注入广告
tags: [trae, 广告]
category: trae
draft: false
customSlug: "32"
image: https://cdn.fis.ink/cdn/2025/08/24/68aaa0dcea828.webp
---
# 事件经过

我在2025.8.17日下午使用trae的SOLO模式并使用SOLO Builder智能体开发vue3的<a href="https://github.com/fishcpy/homepage" target="_blank">个人主页</a>，模型使用的是Claude 4。<br/>
起初在预览环境没有问题，但是我将整个项目上传到github并部署到vercel时右下角却出现SOLO模式的广告组件。<br/>
![1756012616606.webp](https://cdn.fis.ink/cdn/2025/08/24/68aaa04bd2296.webp)<br/>
经过翻代码发现AI在写vite.config.ts时引入了trae的广告组件。<br/>
```
import traeBadgePlugin from 'vite-plugin-trae-solo-badge'
```

```
    traeBadgePlugin({
      variant: 'dark',
      position: 'bottom-right',
      prodOnly: true,
      clickable: true,
      clickUrl: 'https://www.trae.ai/solo?showJoin=1',
      autoTheme: true,
      autoThemeTarget: '#app',
    }),

```
这显然是提示词注入。<br/>

# 如何解决
## 如果你有编程基础
可以直接翻代码移除。
## 如果你没有编程基础
先切换到IDE模式，浏览器在生产环境的网页按F12选择广告组件，复制HTML。<br/>
随便选择一个模型，跟它说删除+复制的html，等待自动删除即可。