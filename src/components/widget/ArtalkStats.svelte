<script lang="ts">
  import { onMount } from 'svelte';
  import { commentConfig } from '@/config';
  
  export let pageKey: string;
  
  let pageViews = 0;
  let commentCount = 0;
  let loading = true;
  
  onMount(async () => {
    if (commentConfig.type === 'artalk' && commentConfig.artalk?.server) {
      try {
        const server = commentConfig.artalk.server;
        const site = commentConfig.artalk.site || 'fishcpy的小破站';
        
        // 获取统计数据
        const response = await fetch(`${server}/api/v2/stats?site_name=${encodeURIComponent(site)}&page_key=${encodeURIComponent(pageKey)}`);
        
        if (response.ok) {
          const data = await response.json();
          pageViews = data.pv || 0;
          commentCount = data.comment_count || 0;
        } else {
          console.warn('Failed to fetch Artalk stats:', response.status);
        }
      } catch (error) {
        console.error('Error fetching Artalk stats:', error);
      } finally {
        loading = false;
      }
    } else {
      loading = false;
    }
  });
</script>

{#if !loading && commentConfig.type === 'artalk'}
  <div class="flex gap-4 text-sm" style="color: var(--text-tertiary)">
    <span class="flex items-center gap-1">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
        <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
      </svg>
      {pageViews}
    </span>
    <span class="flex items-center gap-1">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd"/>
      </svg>
      {commentCount}
    </span>
  </div>
{/if}