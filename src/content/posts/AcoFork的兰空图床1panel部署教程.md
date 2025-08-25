---
title: AcoFork的兰空图床1panel部署教程
published: 2025-08-19
description: 兰空图床
tags: [兰空图床]
category: 兰空图床
draft: true
customSlug: "33"
---
:::warning
仅供学习交流，请在下载后24h(小时)内删除。
:::

# 部署前准备

首先获取安装包等文件，请前往下方链接获取相关文件。
::link-card{url="https://www.2x.nz/posts/hack-lskypro/" title="AcoFork Blog Z" icon="https://q2.qlogo.cn/headimg_dl?dst_uin=2726730791&spec=0"}

# 开始部署

## 部署环境
打开1panel的菜单，点击网站下的运行环境。<br/>
![](https://cdn.fis.ink/cdn/2025/08/19/68a40cd7362d5.webp)

在php板块下，点击创建运行环境，名称随意，php版本选择8.2.28，拓展源哪个离你服务器近就选哪个，模板选择Default模板。

![1755581829662.webp](https://cdn.fis.ink/cdn/2025/08/19/68a40d8835496.webp)

然后在默认拓展中新加imagick拓展，点击确认。

![1755581975094.webp](https://cdn.fis.ink/cdn/2025/08/19/68a40e18e1134.webp)

随后耐心等待php环境制作完整

## 部署网站

点击网站下的网站部分(OpenResty没安装需要安装一下)，

点击创建网站-运行环境。
![1755582295338.webp](https://cdn.fis.ink/cdn/2025/08/19/68a40f5a3b975.webp)
域名填你的域名，代号随意
创建完成后点击网站目录下的文件按钮。
![1755582417352.webp](https://cdn.fis.ink/cdn/2025/08/19/68a40fd33499a.webp)
上传程序到打开的目录下并解压
再返回网站-网站菜单，点击你刚才创建的网站右侧的配置按钮，打开网站目录。
![1755582641969.webp](https://cdn.fis.ink/cdn/2025/08/19/68a410b4e3d72.webp)
首先点击 运行用户/组 一行的保存按钮，再将运行目录设为 /puclic 后点击 保存并重载。
此时应该是下方图片中的样子
![1755582756645.webp](https://cdn.fis.ink/cdn/2025/08/19/68a41127cf8a0.webp)
## 配置程序
ssh连上服务器，执行下方命令，列出所有容器
```
docker container ls
```
找到带有1panel php镜像的容器
![1755583142728.webp](https://cdn.fis.ink/cdn/2025/08/19/68a412a7da185.webp)
复制它的CONTAINER ID，例如我的就是
```
61a83076b964
```
:::tip
.der证书需要先转换为.crt证书
:::
将AcoFork文章中抓包工具的证书放到一个你能记住的目录下，例如我就放到了
```
/ca-cert.crt
```
使用下方命令导入根证书到容器
```
docker cp 你证书存放路径 CONTAINER ID:/usr/local/share/ca-certificates/custom-ca.crt

# 例如我的就是

docker cp /ca-cert.crt 61a83076b964:/usr/local/share/ca-certificates/custom-ca.crt
```

随后进入容器终端
```
docker exec -it CONTAINER ID /bin/sh
# 如果提示/bin/sh: not found，可以尝试
docker exec -it CONTAINER ID /bin/bash
```

设置代理地址
```
# 192.168.100.166:8081要替换为你自己的代理地址
export http_proxy=http://192.168.100.166:8081
export https_proxy=http://192.168.100.166:8081
```

cd到文件目录
```
# example.com需要替换为创建网站时设定的代号，代号可以在面板网站配置的网站目录下查看
cd sites/example.com/index
```
安装程序执行
```
./install.sh
# 如果报错，可以尝试下方指令
sh install.sh
```

安装并抓包，这个环节看下方链接中的文章
::link-card{url="https://www.2x.nz/posts/hack-lskypro/" title="AcoFork Blog Z" icon="https://q2.qlogo.cn/headimg_dl?dst_uin=2726730791&spec=0"}

# 再次提示
:::warning
仅供学习交流，请在下载后24h(小时)内删除。
:::

# 后续操作

安装完成后回到网站菜单下的网站，点击配置，再点击上方的配置文件
![1755584125089.webp](https://cdn.fis.ink/cdn/2025/08/19/68a4167ee7e9d.webp)

删除里面error_page 404 /404.html; 这一行配置
并替换为
```
    # 全局 404 交给 @fallback 处理，不强制状态码
    error_page 404 @fallback;

    location / {
        try_files $uri $uri/ @fallback;
    }

    # 命名 location：交给 index.php，但不强制 200
    location @fallback {
        rewrite ^ /index.php last;
    }

    # -----------------------------
    # 特殊路径：/api/v2/ 也走 index.php，但不能强制 200
    # -----------------------------
    location ^~ /api/v2/ {
        # 同样使用 @fallback，不强制状态码
        try_files $uri $uri/ @fallback;
    }
```

![1755584282584.webp](https://cdn.fis.ink/cdn/2025/08/19/68a4171ce03c4.webp)

最后点击 保存并重载。

# 至此你已经完成了1panel部署，打开网页体验吧！