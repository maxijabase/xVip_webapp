<script lang="ts">
	import Sidebar from '@/components/Sidebar.svelte';
	import Navbar from '@/components/Navbar.svelte';
	import '../app.css';
	let { children } = $props();
	let drawerHidden = $state(true);
</script>

<header
	class="fixed top-0 z-40 mx-auto w-full flex-none border-b border-gray-200 bg-white py-1 dark:border-gray-600 dark:bg-gray-800"
>
	<Navbar bind:drawerHidden />
</header>
<div class="overflow-hidden lg:flex min-h-screen  border-gray-200 bg-white py-1 dark:border-gray-600 dark:bg-gray-800">
	<Sidebar bind:drawerHidden />
	<div class="relative h-full w-full overflow-y-auto pt-22 pl-8 lg:ml-64">
			{@render children()}
	</div>
</div>
