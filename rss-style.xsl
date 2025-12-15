<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  
  <xsl:template match="/">
    <html lang="zh-CN">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="icon" href="https://file.fis.ink/img/fishcpy/logo_c.png" type="image/png"/>

        <title><xsl:value-of select="rss/channel/title"/> - RSS订阅</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #e0e0e0;
            background: #1a1a1a url('https://api.fis.ink/mc') no-repeat center center fixed;
            background-size: cover;
            min-height: 100vh;
            padding: 20px;
          }
          
          .container {
            width: 100%;
            max-width: 1000px;
            margin: 0 auto;
            background: #2d2d2d;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
            overflow: hidden;
          }
          
          .header {
            background: #2d2d2d;
            color: #e0e0e0;
            padding: 30px;
            border-bottom: 1px solid #444;
          }
          
          .rss-icon {
            display: inline-block;
            font-size: 24px;
            margin-right: 10px;
            color: #ff6600;
          }
          
          .site-title {
            font-size: 2em;
            font-weight: 600;
            margin-bottom: 10px;
            display: inline;
          }
          
          .site-description {
            font-size: 1em;
            color: #ccc;
            margin-bottom: 15px;
          }
          
          .rss-info {
            background: #3a3a3a;
            padding: 12px 16px;
            border-radius: 4px;
            font-size: 0.9em;
            color: #ccc;
            border-left: 3px solid #ff6600;
          }
          
          .content {
            padding: 30px;
          }
          
          .stats {
            display: flex;
            justify-content: space-around;
            margin-bottom: 25px;
            padding: 15px;
            background: #3a3a3a;
            border-radius: 4px;
            border: 1px solid #555;
          }
          
          .stat-item {
            text-align: center;
          }
          
          .stat-number {
            font-size: 1.5em;
            font-weight: 600;
            color: #e0e0e0;
            display: block;
          }
          
          .stat-label {
            font-size: 0.9em;
            color: #ccc;
            margin-top: 5px;
          }
          
          .posts-title {
            font-size: 1.5em;
            font-weight: 600;
            margin-bottom: 20px;
            color: #e0e0e0;
            border-bottom: 2px solid #555;
            padding-bottom: 8px;
          }
          
          .post-item {
            margin-bottom: 20px;
            padding: 20px;
            background: #3a3a3a;
            border-radius: 4px;
            border: 1px solid #555;
            transition: border-color 0.2s ease;
          }
          
          .post-item:hover {
            border-color: #666;
          }
          
          .post-title {
            font-size: 1.2em;
            font-weight: 600;
            margin-bottom: 8px;
            line-height: 1.4;
          }
          
          .post-title a {
            color: #e0e0e0;
            text-decoration: none;
          }
          
          .post-title a:hover {
            color: #66aaff;
            text-decoration: underline;
          }
          
          .post-meta {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 15px;
            font-size: 0.9em;
            color: #ccc;
          }
          
          .post-date {
            display: flex;
            align-items: center;
            gap: 5px;
          }
          
          .post-date::before {
            content: '发布于 ';
            font-size: 0.9em;
          }
          
          .post-description {
            color: #ccc;
            line-height: 1.6;
            margin-bottom: 15px;
          }
          
          .read-more {
            color: #66aaff;
            text-decoration: none;
            font-size: 0.9em;
          }
          
          .read-more:hover {
            text-decoration: underline;
          }
          
          .footer {
            text-align: center;
            padding: 30px;
            background: #3a3a3a;
            color: #aaa;
            font-size: 0.9em;
            border-top: 1px solid #555;
          }
          
          .footer a {
            color: #66aaff;
            text-decoration: none;
          }
          
          .footer a:hover {
            text-decoration: underline;
          }
          
          /* 移动端适配 */
          @media (max-width: 768px) {
            body {
              padding: 10px;
            }
            
            .container {
              width: 100%;
              border-radius: 6px;
            }
            
            .header, .content, .footer {
              padding: 15px;
            }
            
            .site-title {
              font-size: 1.6em;
            }
            
            .post-item {
              padding: 15px;
            }
            
            .post-meta {
              flex-direction: column;
              align-items: flex-start;
              gap: 5px;
            }
          }
          
          /* 小屏幕手机适配 */
          @media (max-width: 480px) {
            .site-title {
              font-size: 1.4em;
            }
            
            .post-title {
              font-size: 1.1em;
            }
            
            .post-item {
              padding: 12px;
              margin-bottom: 15px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="header-content">
              <h1 class="site-title">
                <span class="rss-icon">📡</span><xsl:value-of select="rss/channel/title"/>
              </h1>
              <p class="site-description">
                <xsl:value-of select="rss/channel/description"/>
              </p>
              <div class="rss-info">
欢迎订阅RSS！可以使用RSS阅读器订阅此链接获取最新文章。
              </div>
            </div>
          </div>
          
          <div class="content">

            
            <h2 class="posts-title">最新文章</h2>
            
            <xsl:for-each select="rss/channel/item">
              <article class="post-item">
                <h3 class="post-title">
                  <a href="{link}" target="_blank">
                    <xsl:value-of select="title"/>
                  </a>
                </h3>
                
                <div class="post-meta">
                  <div class="post-date">
                    <xsl:variable name="pubDateStr" select="substring-before(pubDate, ' GMT')"/>
                    <xsl:value-of select="$pubDateStr"/> (UTC+8)
                  </div>
                </div>
                
                <xsl:if test="description and description != ''">
                  <div class="post-description">
                    <xsl:value-of select="description" disable-output-escaping="yes"/>
                  </div>
                </xsl:if>
                
                <a href="{link}" target="_blank" class="read-more">
                  阅读全文
                </a>
              </article>
            </xsl:for-each>
          </div>
          
          <div class="footer">
            <p>
              由 <a href="{rss/channel/link}" target="_blank"><xsl:value-of select="rss/channel/title"/></a> 提供
            </p>
            <p style="margin-top: 10px; font-size: 0.85em; color: #666;">
              提示：可以将此RSS链接添加到RSS阅读器中，如Feedly、Inoreader等
            </p>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>