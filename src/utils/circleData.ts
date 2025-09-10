import { circleConfig } from "../config";
import type { CircleApiResponse } from "../types/config";

/**
 * 朋友圈数据管理工具类
 * 支持数据获取和PJAX兼容性
 */
export class CircleDataManager {
	private static instance: CircleDataManager;

	private constructor() {}

	public static getInstance(): CircleDataManager {
		if (!CircleDataManager.instance) {
			CircleDataManager.instance = new CircleDataManager();
		}
		return CircleDataManager.instance;
	}

	/**
	 * 获取朋友圈数据
	 * @returns Promise<CircleApiResponse>
	 */
	public async getCircleData(): Promise<CircleApiResponse> {
		const { dataSource } = circleConfig;

		try {
			// 创建AbortController用于超时控制
			const controller = new AbortController();
			const timeoutId = setTimeout(
				() => controller.abort(),
				dataSource.timeout || 10000,
			);

			const response = await fetch(dataSource.url, {
				signal: controller.signal,
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});

			clearTimeout(timeoutId);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data: CircleApiResponse = await response.json();
			return data;
		} catch (error) {
			console.error("Failed to fetch circle data:", error);
			// 返回默认数据结构
			return this.getDefaultData();
		}
	}

	/**
	 * 获取默认数据结构（用于错误情况）
	 * @returns CircleApiResponse
	 */
	private getDefaultData(): CircleApiResponse {
		return {
			article_data: [],
		};
	}

	/**
	 * 格式化日期
	 * @param dateString 日期字符串
	 * @returns 格式化后的日期字符串
	 */
	public formatDate(dateString: string): string {
		const { dateFormat } = circleConfig.display;
		const date = new Date(dateString);

		// 简单的日期格式化实现
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");

		return dateFormat
			.replace("YYYY", String(year))
			.replace("MM", month)
			.replace("DD", day)
			.replace("HH", hours)
			.replace("mm", minutes);
	}

	/**
	 * 分页处理
	 * @param articles 文章数组
	 * @param page 页码（从1开始）
	 * @returns 分页后的文章数组
	 */
	public paginateArticles(articles: any[], page = 1): any[] {
		const { articlesPerPage } = circleConfig.display;
		const startIndex = (page - 1) * articlesPerPage;
		const endIndex = startIndex + articlesPerPage;
		return articles.slice(startIndex, endIndex);
	}

	/**
	 * 计算总页数
	 * @param totalArticles 文章总数
	 * @returns 总页数
	 */
	public getTotalPages(totalArticles: number): number {
		const { articlesPerPage } = circleConfig.display;
		return Math.ceil(totalArticles / articlesPerPage);
	}
}

/**
 * PJAX兼容的朋友圈数据初始化函数
 * 确保在页面加载和PJAX导航时都能正确初始化
 */
export function initCircleData(): void {
	const { pjax } = circleConfig;

	if (!pjax.enable) return;

	// 页面加载完成时初始化
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", loadCircleData);
	} else {
		loadCircleData();
	}

	// PJAX导航时重新初始化
	document.addEventListener("pjax:complete", loadCircleData);
	document.addEventListener("swup:contentReplaced", loadCircleData); // 支持swup
}

/**
 * 加载朋友圈数据并渲染到页面
 */
async function loadCircleData(): Promise<void> {
	const container = document.querySelector(circleConfig.pjax.containerSelector);
	if (!container) return;

	try {
		const manager = CircleDataManager.getInstance();
		const data = await manager.getCircleData();

		// 这里可以调用具体的渲染函数
		renderCircleData(container, data);

		// 如果配置了滚动到顶部
		if (circleConfig.pjax.scrollToTop) {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}

		// 如果配置了更新标题
		if (circleConfig.pjax.updateTitle) {
			document.title = `朋友圈 - ${document.title.split(" - ")[1] || ""}`;
		}
	} catch (error) {
		console.error("Failed to load circle data:", error);
	}
}

/**
 * 渲染朋友圈数据到页面
 * @param container 容器元素
 * @param data 朋友圈数据
 */
function renderCircleData(container: Element, data: CircleApiResponse): void {
	// 这里实现具体的渲染逻辑
	console.log("Rendering circle data:", data);

	const { display } = circleConfig;
	let html = "";

	// 渲染文章列表
	html += '<div class="circle-articles">';
	data.article_data.forEach((article) => {
		html += `
			<div class="article-item">
				${display.showAvatar && article.avatar ? `<img src="${article.avatar}" alt="${article.author}" class="author-avatar">` : ""}
				<div class="article-content">
					<h3><a href="${article.link}" target="_blank">${article.title}</a></h3>
					${display.showAuthor ? `<p class="author">作者: ${article.author}</p>` : ""}
					<p class="date">${CircleDataManager.getInstance().formatDate(article.created)}</p>
				</div>
			</div>
		`;
	});
	html += "</div>";

	container.innerHTML = html;
}

// 导出单例实例供外部使用
export const circleDataManager = CircleDataManager.getInstance();
