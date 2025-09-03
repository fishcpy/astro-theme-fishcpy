<script lang="ts">
  import { onMount } from 'svelte';
  
  let totalViews = 0;
  let loading = true;
  let error = null;

  onMount(() => {
    // 等待Twikoo加载完成
    const checkTwikoo = () => {
      if (typeof window !== 'undefined' && window.twikoo) {
        // 如果Twikoo已加载，尝试获取统计信息
        try {
          // 这里可以添加获取Twikoo统计信息的逻辑
          // 目前先显示一个简单的统计
          const visitorsElement = document.getElementById('twikoo_visitors');
          if (visitorsElement && visitorsElement.textContent !== '0') {
            totalViews = parseInt(visitorsElement.textContent) || 0;
          }
          loading = false;
        } catch (err) {
          error = '统计数据获取失败';
          loading = false;
        }
      } else {
        // 如果Twikoo还没加载，继续等待
        setTimeout(checkTwikoo, 1000);
      }
    };

    // 开始检查
    setTimeout(checkTwikoo, 2000); // 给Twikoo一些时间加载

    // 5秒后停止加载
    setTimeout(() => {
      if (loading) {
        loading = false;
        error = '统计服务暂时不可用';
      }
    }, 5000);
  });
</script>

<div class="pb-4 card-base card-shadow onload-animation" style="animation-delay: 250ms">
  <div class="font-bold transition text-lg text-neutral-900 dark:text-neutral-100 relative ml-8 mt-4 mb-2
      before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)]
      before:absolute before:left-[-16px] before:top-[5.5px]">访问统计</div>
  
  <div class="px-4 overflow-hidden">
    {#if loading}
      <div class="text-sm py-2" style="color: var(--text-tertiary)">
        <div class="flex items-center justify-center">
          <svg class="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          加载中...
        </div>
      </div>
    {:else if error}
      <div class="text-sm py-2">
        <div class="flex items-center justify-center" style="color: var(--text-tertiary)">
          <svg class="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      </div>
    {:else}
      <div class="space-y-1 text-sm">
        <div class="flex justify-between">
          <span>博客访问量:</span>
          <span>{totalViews > 0 ? totalViews : '统计中'}</span>
        </div>
        <div class="flex justify-between" style="color: var(--text-tertiary)">
          <span>数据来源:</span>
          <span>Twikoo</span>
        </div>
      </div>
    {/if}
  </div>
</div>