<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  let admins = $state(data.admins ?? []);
</script>

<div class="container mx-auto">
  <h1 class="text-2xl font-semibold">Admins</h1>
  <div class="mt-4 flex flex-col">
    {#each admins as admin}
      <div
        class="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
      >
        <div class="flex items-center">
          <img src="/default-avatar.png" alt={admin.name} class="h-10 w-10 rounded-full" />
          <div class="ml-4">
            <p class="text-lg font-semibold">{admin.name}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {admin.steamid}
            </p>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
