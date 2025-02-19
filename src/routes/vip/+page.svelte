<script lang="ts">
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
  import VIPList from '$lib/components/VIPList.svelte';
  import VIPLogs from '$lib/components/VIPLogs.svelte';
  import { Heading } from 'flowbite-svelte';
  import type { VIP } from '@/models/vip';
  import type { VIPLog } from '@/models/vipLog';
  import type { WebUser } from '@/models/webUser';

  interface Props {
    vipsPromise: Promise<VIP[]>;
    logsPromise: Promise<VIPLog[]>;
    user: WebUser;
  }

  let { data }: { data: Props } = $props();

  let vipsPromise = $state(data.vipsPromise);
  let logsPromise = $state(data.logsPromise);
</script>

<div class="container">
  <Heading class="pb-4">VIP List</Heading>
  {#await vipsPromise}
    <LoadingSpinner />
  {:then vips}
    <VIPList {vips} user={data.user} />
  {/await}

  {#if data.user?.role === 'admin' || data.user?.role === 'owner'}
    <Heading class="pt-8 pb-4">Latest activity</Heading>
    {#await logsPromise}
      <LoadingSpinner />
    {:then vipLogs}
      <VIPLogs logs={vipLogs} />
    {/await}
  {/if}
</div>

<style>
  .container {
    padding: 1rem;
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
