<script lang="ts">
  import {
    Avatar,
    DarkMode,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    NavBrand,
    NavHamburger,
    NavLi,
    NavUl,
    Navbar,
    Search,
    Button
  } from 'flowbite-svelte';
  import '../../app.css';
  import type { WebUser } from '@/models/webUser';

  let { drawerHidden = $bindable<boolean>(false), user } = $props<{
    drawerHidden?: boolean;
    user?: WebUser;
  }>();

  // Function to handle Steam login
  function handleSteamLogin() {
    window.location.href = '/auth/steam'; // Adjust this to your Steam auth endpoint
  }

  // Function to handle logout
  function handleLogout() {
    // Implement your logout logic here
    window.location.href = '/auth/logout'; // Adjust this to your logout endpoint
  }

  // Helper function to format last login time
  function formatLastLogin(timestamp: number) {
    return new Date(timestamp * 1000).toLocaleDateString();
  }
</script>

<Navbar fluid={true} class="text-black" color="default">
  <NavHamburger
    onClick={() => (drawerHidden = !drawerHidden)}
    class="m-0 me-3 md:block lg:hidden"
  />
  <NavBrand href="/" class="lg:w-60">
    <span
      class="ml-px self-center text-xl font-semibold whitespace-nowrap sm:text-2xl dark:text-white"
    >
      xVip
    </span>
  </NavBrand>
  <div class="ms-auto flex items-center gap-3 text-gray-500 sm:order-2 dark:text-gray-400">
    <DarkMode />

    {#if user}
      <!-- User is logged in -->
      <button class="rounded-full ring-gray-400 focus:ring-4 dark:ring-gray-600">
        <Avatar size="sm" src={user.avatarmedium} alt={user.personaname} tabindex={0} />
      </button>
      <Dropdown placement="bottom-end">
        <DropdownHeader>
          <span class="block text-sm">{user.personaname}</span>
          <span class="block truncate text-sm font-medium">
            Role: {user.role}
          </span>
          <span class="block text-xs text-gray-500">
            Last login: {formatLastLogin(user.lastlogoff)}
          </span>
        </DropdownHeader>
        <DropdownItem href={user.profileurl} target="_blank">Steam Profile</DropdownItem>
        {#if user.role === 'admin' || user.role === 'owner'}
          <DropdownItem href="/admin">Admin Panel</DropdownItem>
        {/if}
        <DropdownItem href="/dashboard">Dashboard</DropdownItem>
        <DropdownItem href="/settings">Settings</DropdownItem>
        <DropdownDivider />
        <DropdownItem on:click={handleLogout}>Sign out</DropdownItem>
      </Dropdown>
    {:else}
      <!-- User is not logged in -->
      <Button size="sm" color="dark" class="flex items-center gap-2" on:click={handleSteamLogin}>
        Login with Steam
      </Button>
    {/if}
  </div>
</Navbar>
