<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Button,
		Tooltip
	} from 'flowbite-svelte';
	import { EditSolid, TrashBinSolid } from 'flowbite-svelte-icons';
	import type { VIP } from '@/models/vip';
	import type { WebUser } from '@/models/webUser';

	export let vips: VIP[];
	export let user: WebUser | undefined;

	function isAdmin(user: WebUser | undefined): boolean {
		return user?.role === 'admin' || user?.role === 'owner';
	}

	function formatDate(timestamp: number) {
		return new Date(timestamp * 1000).toLocaleDateString();
	}

	function isActive(enddate: number) {
		return Date.now() / 1000 < enddate;
	}
</script>

<div class="table-container border border-gray-200 dark:border-gray-700">
	<Table striped={true} hoverable={true}>
		<TableHead>
			<TableHeadCell>Name</TableHeadCell>
			<TableHeadCell>Start Date</TableHeadCell>
			<TableHeadCell>End Date</TableHeadCell>
			<TableHeadCell>Status</TableHeadCell>
			<TableHeadCell>Admin</TableHeadCell>
			{#if isAdmin(user)}
				<TableHeadCell>Actions</TableHeadCell>
			{/if}
		</TableHead>
		<TableBody>
			{#each vips as vip}
				<TableBodyRow>
					<TableBodyCell>
						<a
							href={`https://steamcommunity.com/profiles/${vip.steamid}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							{vip.name}
						</a>
					</TableBodyCell>
					<TableBodyCell>{formatDate(vip.startdate)}</TableBodyCell>
					<TableBodyCell>{formatDate(vip.enddate)}</TableBodyCell>
					<TableBodyCell>
						<span
							class="rounded-full px-2.5 py-0.5 text-xs font-medium"
							class:bg-green-100={isActive(vip.enddate)}
							class:text-green-800={isActive(vip.enddate)}
							class:bg-red-100={!isActive(vip.enddate)}
							class:text-red-800={!isActive(vip.enddate)}
						>
							{isActive(vip.enddate) ? 'Active' : 'Expired'}
						</span>
					</TableBodyCell>
					<TableBodyCell>{vip.admin_name}</TableBodyCell>
					<TableBodyCell>
						{#if isAdmin(user)}
							<div class="flex gap-2">
								<Button size="xs" color="light">
									<EditSolid class="h-4 w-4 text-gray-500 hover:text-blue-600" />
								</Button>
								<Tooltip>Edit</Tooltip>
								<Button size="xs" color="light">
									<TrashBinSolid class="h-4 w-4 text-gray-500 hover:text-red-600" />
								</Button>
								<Tooltip>Delete</Tooltip>
							</div>
						{/if}
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>

<style>
	.table-container {
		overflow-x: auto;
		margin: 1rem 0;
	}
</style>
