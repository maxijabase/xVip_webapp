<script lang="ts">
	export let data;

	function login() {
		window.location.href = 'auth/login';
	}

	function logout() {
		window.location.href = '/auth/logout';
	}
</script>

<main>
	<h1 class="mb-4 text-2xl">Steam Auth Test</h1>

	{#if data.isAuthenticated}
		<p class="mb-4">You are logged in!</p>
		<button on:click={logout} class="rounded bg-red-500 px-4 py-2 text-white"> Logout </button>
	{:else}
		<button on:click={login} class="rounded bg-blue-500 px-4 py-2 text-white">
			Login with Steam
		</button>
	{/if}
</main>
