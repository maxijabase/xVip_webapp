<script>
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
		Search
	} from 'flowbite-svelte';
	import '../../app.css';

	export let fluid = true;
	export let drawerHidden = false;
	export let list = false;
</script>

<Navbar {fluid} class="text-black" color="default">
	<NavHamburger
		onClick={() => (drawerHidden = !drawerHidden)}
		class="m-0 me-3 md:block lg:hidden"
	/>
	<NavBrand href="/" class={list ? 'w-40' : 'lg:w-60'}>
		<span
			class="ml-px self-center text-xl font-semibold whitespace-nowrap sm:text-2xl dark:text-white"
		>
			xVip
		</span>
	</NavBrand>
	<div class="ms-auto flex items-center text-gray-500 sm:order-2 dark:text-gray-400">
		<DarkMode />
		<button class="ms-3 rounded-full ring-gray-400 focus:ring-4 dark:ring-gray-600">
			<Avatar size="sm" src={'https://avatars.steamstatic.com/b273bc972a0563e7d8e39fa12928f2cc9a76da59.jpg'} tabindex={0} />
		</button>
		<Dropdown placement="bottom-end">
			<DropdownHeader>
				<span class="block text-sm">ampere</span>
				<span class="block truncate text-sm font-medium">maxijabase@gmail.com</span>
			</DropdownHeader>
			<DropdownItem>Dashboard</DropdownItem>
			<DropdownItem>Settings</DropdownItem>
			<DropdownItem>Earnings</DropdownItem>
			<DropdownDivider />
			<DropdownItem>Sign out</DropdownItem>
		</Dropdown>
	</div>
</Navbar>
