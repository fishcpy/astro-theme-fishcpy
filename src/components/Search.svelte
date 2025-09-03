<script lang="ts">
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import Icon from "@iconify/svelte";
import { url } from "@utils/url-utils.ts";
import { onMount } from "svelte";
import type { SearchResult } from "@/global";

let keywordMobile = "";
let result: SearchResult[] = [];
let isSearching = false;
let pagefindLoaded = false;
let initialized = false;

const fakeResult: SearchResult[] = [
	{
		url: url("/"),
		meta: {
			title: "This Is a Fake Search Result",
		},
		excerpt:
			"Because the search cannot work in the <mark>dev</mark> environment.",
	},
	{
		url: url("/"),
		meta: {
			title: "If You Want to Test the Search",
		},
		excerpt: "Try running <mark>npm build && npm preview</mark> instead.",
	},
];

const togglePanel = () => {
	const panel = document.getElementById("search-panel");
	panel?.classList.toggle("float-panel-closed");
};

const setPanelVisibility = (show: boolean, isDesktop: boolean): void => {
	const panel = document.getElementById("search-panel");
	if (!panel) return;

	// 对于桌面端，根据搜索结果控制面板显示
	if (isDesktop) {
		if (show) {
			panel.classList.remove("float-panel-closed");
		} else {
			panel.classList.add("float-panel-closed");
		}
	}
	// 移动端面板的显示由用户手动控制，但如果没有结果且关键词为空，也应该隐藏
	else {
		if (!show && (!keywordMobile || keywordMobile.trim() === "")) {
			panel.classList.add("float-panel-closed");
		}
	}
};

const search = async (keyword: string, isDesktop: boolean): Promise<void> => {
	if (!keyword) {
		result = [];
		return;
	}

	if (!initialized) {
		return;
	}

	isSearching = true;

	try {
		let searchResults: SearchResult[] = [];

		if (import.meta.env.PROD && pagefindLoaded && window.pagefind) {
			const response = await window.pagefind.search(keyword);
			if (response.results && response.results.length > 0) {
				searchResults = await Promise.all(
					response.results.map((item) => item.data()),
				);
			} else {
				searchResults = [];
			}
		} else if (import.meta.env.DEV) {
			// 在开发环境中，如果关键词为空或很短，返回空结果
			if (keyword.trim().length < 2) {
				searchResults = [];
			} else {
				searchResults = fakeResult;
			}
		} else {
			searchResults = [];
			console.error("Pagefind is not available in production environment.");
		}

		result = searchResults;
		setPanelVisibility(result.length > 0, isDesktop);
	} catch (error) {
		console.error("Search error:", error);
		result = [];
		setPanelVisibility(false, isDesktop);
	} finally {
		isSearching = false;
	}
};

onMount(() => {
	const initializeSearch = () => {
		initialized = true;
		pagefindLoaded =
			typeof window !== "undefined" &&
			!!window.pagefind &&
			typeof window.pagefind.search === "function";
		console.log("Pagefind status on init:", pagefindLoaded);
		if (keywordMobile) search(keywordMobile, false);
	};

	if (import.meta.env.DEV) {
		console.log(
			"Pagefind is not available in development mode. Using mock data.",
		);
		initializeSearch();
	} else {
		document.addEventListener("pagefindready", () => {
			console.log("Pagefind ready event received.");
			initializeSearch();
		});
		document.addEventListener("pagefindloaderror", () => {
			console.warn(
				"Pagefind load error event received. Search functionality will be limited.",
			);
			initializeSearch(); // Initialize with pagefindLoaded as false
		});

		// Fallback in case events are not caught or pagefind is already loaded by the time this script runs
		setTimeout(() => {
			if (!initialized) {
				console.log("Fallback: Initializing search after timeout.");
				initializeSearch();
			}
		}, 2000); // Adjust timeout as needed
	}
});

$: if (initialized) {
	(async () => {
		await search(keywordMobile, false);
	})();
}
</script>

<!-- search toggle btn for all devices -->
<button on:click={togglePanel} aria-label="Search Panel" id="search-switch"
        class="btn-plain scale-animation rounded-lg w-11 h-11 mr-2 active:scale-90">
    <Icon icon="material-symbols:search" class="text-[1.25rem]"></Icon>
</button>

<!-- search panel -->
<div id="search-panel" class="float-panel float-panel-closed search-panel search-panel-glass fixed md:w-[30rem] w-[90vw]
top-20 left-1/2 transform -translate-x-1/2 shadow-2xl rounded-2xl p-2 z-50">

    <!-- search bar inside panel for all devices -->
    <div id="search-bar-inside" class="flex relative transition-all items-center h-11 rounded-xl search-bar-glass">
        <Icon icon="material-symbols:search" class="absolute text-[1.25rem] pointer-events-none ml-3 transition my-auto text-black/30 dark:text-white/30"></Icon>
        <input placeholder="{i18n(I18nKey.search)}" bind:value={keywordMobile}
               on:input={() => search(keywordMobile, false)}
               class="pl-10 absolute inset-0 text-sm bg-transparent outline-0
               text-black/50 dark:text-white/50"
        >
    </div>

    <!-- search results -->
    {#each result as item}
        <a href={item.url}
           class="transition first-of-type:mt-2 lg:first-of-type:mt-0 group block
       rounded-xl text-lg px-3 py-2 hover:bg-[var(--btn-plain-bg-hover)] active:bg-[var(--btn-plain-bg-active)]">
            <div class="transition text-90 inline-flex font-bold group-hover:text-[var(--primary)]">
                {item.meta.title}<Icon icon="fa6-solid:chevron-right" class="transition text-[0.75rem] translate-x-1 my-auto text-[var(--primary)]"></Icon>
            </div>
            <div class="transition text-sm text-neutral-600 dark:text-neutral-400">
                {@html item.excerpt}
            </div>
        </a>
    {/each}
</div>

<style>
  input:focus {
    outline: 0;
  }
  .search-panel {
    max-height: calc(100vh - 100px);
    overflow-y: auto;
  }
  
  .search-panel-glass {
    background-color: rgba(255, 255, 255, 0.8) !important;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* 深色模式下的搜索面板半透明效果 */
  :global(.dark) .search-panel-glass {
    background-color: rgba(35, 35, 35, 0.8) !important;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  
  /* 搜索框的半透明效果 */
  .search-bar-glass {
    background-color: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .search-bar-glass:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }
  
  .search-bar-glass:focus-within {
    background-color: rgba(255, 255, 255, 0.8);
    border-color: rgba(255, 255, 255, 0.3);
  }

  /* 深色模式下的搜索框半透明效果 */
  :global(.dark) .search-bar-glass {
    background-color: rgba(35, 35, 35, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  :global(.dark) .search-bar-glass:hover {
    background-color: rgba(35, 35, 35, 0.7);
  }
  
  :global(.dark) .search-bar-glass:focus-within {
    background-color: rgba(35, 35, 35, 0.8);
    border-color: rgba(255, 255, 255, 0.15);
  }
</style>
