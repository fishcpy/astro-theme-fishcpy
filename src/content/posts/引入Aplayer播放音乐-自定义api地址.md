---
title: 引入Aplayer播放音乐-自定义api地址
published: 2024-12-07
description: 本文分享如何在 akilar糖果屋主题中自定义 Aplayer 的 meting_js API 地址，解决官方API不稳定、歌曲播放断续的问题，通过在注入的 Aplayer 容器中添加 `data-meting_api` 参数，实现调用自定义的音乐接口。
image: https://imgse.fishcpy.top/upload/675da6ed64160.png
tags: [Aplayer]
category: Aplayer
draft: false
customSlug: "19"
---

> ## 此文章仅适用于akilar糖果屋中的 **引入Aplayer播放音乐** 文章 [https://akilar.top/posts/3afa069a/](https://akilar.top/posts/3afa069a/) ，其他请自行测试\]

# 1.为什么要自定义api地址

meting\_js的官方api很不稳定，播放歌曲断断续续，所以要自定义api地址

# 2.如何自定义api地址

akilar糖果屋中有这样一些字 4.在主题配置文件`[Blogroot]\_config.butterfly.yml`的inject配置项中添加Aplayer的容器。

1
2
3
4

inject:
  head:
  bottom:
    - <div class="aplayer no-destroy" data-id="5183531430" data-server="netease" data-type="playlist" data-fixed="true" data-mini="true" data-listFolded="false" data-order="random" data-preload="none" data-autoplay="false" muted></div>

1.  Aplayer的网易云歌单接口时不时的会挂掉，所以如果你确定你配置正确，但是歌单还是没有出现。不妨去看看其他人的站点是不是也没有Aplayer标签了来判断是Aplayer本身接口的问题还是自己配置出错的问题。

里面并没有说如何自定义api地址 所根据我的尝试，成功自定义api地址

1
2
3
4
5

\# akilar糖果屋中原本代码
\- <div class="aplayer no-destroy" data-id="5183531430" data-server="netease" data-type="playlist" data-fixed="true" data-mini="true" data-listFolded="false" data-order="random" data-preload="none" data-autoplay="false" muted></div>

\# 修改后
\- <div class="aplayer no-destroy" data-id="5183531430" data-server="netease" data-type="playlist" data-fixed="true" data-mini="true" data-listFolded="false" data-order="random" data-preload="none" data-autoplay="false" data-meting\_api="https://meting.qjqq.cn/?server=:server&type=:type&id=:id&auth=:auth&r=:r" muted></div>

根据上方的配置参数，这里添加了一个data-meting\_api=”[https://meting.qjqq.cn/?server=:server&type=:type&id=:id&auth=:auth&r=:r](https://meting.qjqq.cn/?server=:server&type=:type&id=:id&auth=:auth&r=:r)“ 如果以后这个挂了也可以自建或者使用别人的api