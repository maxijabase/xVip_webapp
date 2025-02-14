<script lang="ts">
    import type { PageData } from './$types';
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
    import VIPList from '$lib/components/VIPList.svelte';
    import VIPLogs from '$lib/components/VIPLogs.svelte';
    import { Heading } from 'flowbite-svelte';

    let { data }: { data: PageData } = $props();
    let vipsPromise = Promise.resolve(data.vips);
    let vipLogsPromise = Promise.resolve(data.vipLogs);
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
        {#await vipLogsPromise}
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
