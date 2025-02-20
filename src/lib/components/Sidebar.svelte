<script lang="ts">
  import { page } from '$app/state';
  import type { WebUser } from '@/models/webUser';

  import {
    Sidebar,
    SidebarDropdownWrapper,
    SidebarGroup,
    SidebarItem,
    SidebarWrapper,
    P
  } from 'flowbite-svelte';

  import { Star, ChevronDown, ChevronUp, ShoppingBag } from 'lucide-svelte';

  const { drawerHidden = $bindable(false), user } = $props<{
    drawerHidden?: boolean;
    user?: WebUser; // Make user optional
  }>();

  let iconClass =
    'flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white';
  let itemClass =
    'flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700';
  let groupClass = 'py-2 space-y-2';

  let mainSidebarUrl: string = $state(page.url.pathname);
  let activeMainSidebar: string;

  interface NavItems {
    name: string;
    icon: any;
    children?: NavItems[];
    href?: string;
  }

  let userItems: NavItems[] = [
    {
      name: 'VIPs',
      icon: Star,
      href: '/vip'
    }
  ];

  let dropdowns = Object.fromEntries(Object.keys(userItems).map((x) => [x, false]));
</script>

<Sidebar
  class={drawerHidden ? 'hidden' : ''}
  activeUrl={mainSidebarUrl}
  activeClass="bg-gray-100 dark:bg-gray-700"
  asideClass="fixed inset-0 z-30 flex-none h-full w-64 lg:h-auto border-e border-gray-200 dark:border-gray-600 lg:overflow-y-visible lg:pt-16 lg:block"
>
  <SidebarWrapper
    divClass="overflow-y-auto px-3 pt-20 lg:pt-5 h-full bg-white scrolling-touch max-w-2xs lg:h-[calc(100vh-4rem)] lg:block dark:bg-gray-800 lg:sticky top-2"
  >
    <nav class="divide-y divide-gray-200 dark:divide-gray-700">
      <!-- User items -->
      <SidebarGroup>
        <P>VIP</P>
        {#each userItems as item, i (item.name)}
          <SidebarItem label={item.name} href={item.href} class={itemClass}>
            <svelte:fragment slot="icon">
              <item.icon class={iconClass} />
            </svelte:fragment>
          </SidebarItem>
        {/each}
      </SidebarGroup>
    </nav>
  </SidebarWrapper>
</Sidebar>
