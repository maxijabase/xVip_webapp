<script lang="ts">
	import type { VIPLog } from '@/models/vipLog';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { CirclePlus, CircleMinus, RefreshCw, Clock } from 'lucide-svelte';

	export let logs: VIPLog[];

	const actionConfig = {
		add: { icon: CirclePlus, color: 'text-green-600' },
		remove: { icon: CircleMinus, color: 'text-red-600' },
		extend: { icon: RefreshCw, color: 'text-blue-600' },
		expire: { icon: Clock, color: 'text-yellow-600' }
	};
</script>

<Table hoverable={true}>
	<TableHead>
		<TableHeadCell>Action</TableHeadCell>
		<TableHeadCell>Target</TableHeadCell>
		<TableHeadCell>Admin</TableHeadCell>
		<TableHeadCell>Date</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each logs as log}
			<TableBodyRow>
				<TableBodyCell>
					<div class="flex items-center gap-2">
						<svelte:component
							this={actionConfig[log.action_type].icon}
							class={actionConfig[log.action_type].color}
							size={20}
							strokeWidth={2}
						/>
						<span class="text-sm">{log.action_type}</span>
					</div>
				</TableBodyCell>
				<TableBodyCell>
					<span class="font-medium">{log.target_name}</span>
					<span class="ml-1 text-sm text-gray-400">({log.target_steamid})</span>
				</TableBodyCell>
				<TableBodyCell>
					<span class="font-medium">{log.admin_name}</span>
					<span class="ml-1 text-sm text-gray-400">({log.admin_steamid})</span>
				</TableBodyCell>
				<TableBodyCell>{new Date(log.timestamp).toLocaleString()}</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
