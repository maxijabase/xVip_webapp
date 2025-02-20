<script lang="ts">
  import Sidebar from '@/components/Sidebar.svelte';
  import Navbar from '@/components/Navbar.svelte';
  import '../app.css';
  import type { LayoutProps } from './$types';
  import type { WebUser } from '@/models/webUser';

  let { data, children }: LayoutProps = $props();
  let drawerHidden = $state(true);

  // Since data is the user object directly from layout.server.ts
  let user = $state(data as WebUser | undefined);
</script>

<header
  class="fixed top-0 z-40 mx-auto w-full flex-none border-b border-gray-200 bg-white py-1 dark:border-gray-600 dark:bg-gray-800"
>
  <Navbar bind:drawerHidden {user} />
</header>
<div
  class="min-h-screen overflow-hidden border-gray-200 bg-white py-1 lg:flex dark:border-gray-600 dark:bg-gray-800"
>
  <Sidebar bind:drawerHidden {user} />
  <div class="relative h-full w-full overflow-y-auto pt-22 pl-8 lg:ml-64">
    {@render children()}
  </div>
</div>
