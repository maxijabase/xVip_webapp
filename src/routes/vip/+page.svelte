<script lang="ts">
    import type { PageData } from './$types';
    import SteamProfile from '$lib/components/SteamProfile.svelte';
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

    let { data }: { data: PageData } = $props();
    let userPromise = Promise.resolve(data.steamUser);
</script>

<h1>VIP Page</h1>

<div class="container">
    {#await userPromise}
        <LoadingSpinner />
    {:then user}
        {#if user}
            <SteamProfile user={user} />
        {:else}
            <p>No Steam user data found.</p>
        {/if}
    {/await}
</div>

<style>
    .container {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
    }
    .posts {
        max-width: 800px;
        margin: 0 auto;
    }
    .post {
        margin: 20px 0;
        padding: 15px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
</style>