---
title: 腾讯EO加速cloudflare内网穿透
published: 2025-07-10
description: 本文详细介绍了如何结合Cloudflare内网穿透与腾讯EdgeOne（EO）实现网站免费加速和HTTPS加密。首先指导用户通过子域名部署Cloudflare内网穿透（避开主域名），随后分步演示腾讯EO的激活流程：包括免费套餐兑换、域名接入、TXT记录验证，以及关键性的CNAME解析设置（特别强调Cloudflare需设为"仅DNS"模式）。最终通过自动化SSL证书申请，实现零成本HTTPS加速方案。适用于中国大陆及国际版用户，附图文操作指引。
image: https://s3.fis.ink/blog/2025-07-11-D93091D5-7EFA-49B5-B114-1DE2B55BAC42.webp
tags: [cloudflare, EO]
category: cloudflare, eo
draft: false
---

# 部署cloudflare内网穿透

首先先部署cloudflare内网穿透，建议看[技术爬爬虾视频](https://www.bilibili.com/video/BV1H4421X7Wg)

<div style="position:relative; padding-bottom:56.25%; /* 16:9比例 */">
  <iframe
    src="//player.bilibili.com/player.html?isOutside=true&aid=1755356599&bvid=BV1H4421X7Wg&cid=1569261069&p=1"
    style="position:absolute; width:100%; height:100%;"
    frameborder="no"
    scrolling="no"
    allowfullscreen="true">
  </iframe>
</div>

**_注意：不要穿透你要使用EO加速的域名，请穿透一个不用的子域名_**

# 使用EO加速

完成上方步骤后打开[腾讯EO](https://edgeone.ai/)注册账号使用兑换码激活免费套餐，中国大陆用户更推荐在[腾讯云](https://console.cloud.tencent.com/edgeone)平台激活

国际版点击兑换免费套餐即可

![](https://s3.fis.ink/blog/2025-07-10-AAA033F7-6DB2-47A6-A97B-A2908F4BD58C.png)

国内腾讯云在下方图片位置激活即可

![](https://s3.fis.ink/blog/2025-07-10-3FAE9AD0-115C-4CE6-B4E4-0DB34997CC23.png)

这里以国内腾讯云平台演示

随后添加域名，点击新增站点

![](https://s3.fis.ink/blog/2025-07-10-24833938-76CF-432A-A2DB-69039901EE94.png)

然后输入你的域名，例如我的就是fis.ink，再点击开始接入

![](https://s3.fis.ink/blog/2025-07-10-A2247AD0-B8FA-4690-9CB4-CC53E09F8F89.png)

随后点击绑定至套餐，我这里绑定了，所以没有了，兑换完成是会有一个免费套餐的选择绑定即可  
![](https://s3.fis.ink/blog/2025-07-10-32F3F792-900D-49EC-8B64-DBF3E59B40CF.png)

然后腾讯云会给你一个txt记录，在你当前的dns服务商添加即可。然后点击验证完成验证。

随后点击域名管理-添加域名  
![](https://s3.fis.ink/blog/2025-07-10-74343D1F-436D-4663-ABD0-B7E39F116260.png)

按照我下方的填

![](https://s3.fis.ink/blog/2025-07-10-DF9D3B38-23C6-49D8-8C09-D123FD1AA748.png)点击下一步

  
![](https://s3.fis.ink/blog/2025-07-10-F19F95FD-0B63-46BB-8307-9DA7741B848B.png)

然后添加cname记录

例如我在cloudflare就按照下方添加，其他dns同理。

如果在cloudflare请注意代理状态一定要为**_仅DNS_**

![](https://s3.fis.ink/blog/2025-07-10-4870BB2B-0BC6-4340-93F9-781AA8CDB215.png)  
添加完成后等待一段时间腾讯EO就会**_免费_**为你申请SSL证书，开启**_免费https_**访问

然后就可以访问自己的网站了