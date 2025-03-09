<script lang="ts">
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Button,
    Tooltip,
    Modal,
    Label,
    Input,
    Select,
    ButtonGroup
  } from 'flowbite-svelte';
  import { EditSolid, TrashBinSolid } from 'flowbite-svelte-icons';
  import type { WebAdmin } from '@/models/webAdmin';
  import type { WebUser } from '@/models/webUser';
  import type { Role } from '@/models/role';

  let {
    admins,
    user,
    onUpdate = (admin: WebAdmin) => {},
    onDelete = (admin: WebAdmin) => {}
  } = $props();

  let showEditModal = $state(false);
  let editingAdmin: WebAdmin | null = $state(null);
  let editName = $state('');
  let editRole: Role = $state('admin');

  const roles: Role[] = ['admin', 'owner'];

  function isAdmin(user: WebUser | undefined): boolean {
    return user?.role === 'admin' || user?.role === 'owner';
  }

  function formatDate(timestamp: Date | string | number) {
    if (!timestamp) return 'N/A';

    try {
      const date = timestamp instanceof Date ? timestamp : new Date(timestamp);

      return date.toLocaleDateString();
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Invalid date';
    }
  }

  function formatRole(role: string | number): string {
    if (typeof role === 'number') {
      // Map numeric roles to string values if needed
      const roleMap: Record<number, string> = {
        1: 'admin',
        2: 'owner',
      };
      return roleMap[role] || `role_${role}`;
    }
    return role;
  }

  function getRoleClass(role: string | number): string {
    const roleStr = formatRole(role);

    if (roleStr === 'owner') return 'bg-red-100 text-red-800';
    if (roleStr === 'admin') return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800'; // default for 'user' or any other role
  }

  function openEditModal(admin: WebAdmin) {
    editingAdmin = admin;
    editName = admin.name;
    editRole = admin.roleid;
    showEditModal = true;
  }

  function saveAdmin() {
    if (!editingAdmin) return;

    const updatedAdmin = {
      ...editingAdmin,
      name: editName,
      roleid: editRole
    };

    onUpdate(updatedAdmin);
    showEditModal = false;
  }

  function confirmDelete(admin: WebAdmin) {
    if (confirm(`Are you sure you want to delete ${admin.name}?`)) {
      onDelete(admin);
    }
  }
</script>

<div class="table-container border border-gray-200 dark:border-gray-700">
  <Table striped={true} hoverable={true}>
    <TableHead>
      <TableHeadCell>Name</TableHeadCell>
      <TableHeadCell>Steam ID</TableHeadCell>
      <TableHeadCell>Role</TableHeadCell>
      <TableHeadCell>Created Date</TableHeadCell>
      {#if isAdmin(user)}
        <TableHeadCell>Actions</TableHeadCell>
      {/if}
    </TableHead>
    <TableBody>
      {#each admins as admin}
        <TableBodyRow>
          <TableBodyCell>
            <a
              href={`https://steamcommunity.com/profiles/${admin.steamid}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {admin.name}
            </a>
          </TableBodyCell>
          <TableBodyCell>{admin.steamid}</TableBodyCell>
          <TableBodyCell>
            <span
              class="rounded-full px-2.5 py-0.5 text-xs font-medium {getRoleClass(admin.roleid)}"
            >
              {formatRole(admin.roleid)}
            </span>
          </TableBodyCell>
          <TableBodyCell>{formatDate(admin.timestamp)}</TableBodyCell>
          {#if isAdmin(user)}
            <TableBodyCell>
              <div class="flex gap-2">
                <Button size="xs" color="light" onclick={() => openEditModal(admin)}>
                  <EditSolid class="h-4 w-4 text-gray-500 hover:text-blue-600" />
                </Button>
                <Tooltip>Edit</Tooltip>
                <Button size="xs" color="light" onclick={() => confirmDelete(admin)}>
                  <TrashBinSolid class="h-4 w-4 text-gray-500 hover:text-red-600" />
                </Button>
                <Tooltip>Delete</Tooltip>
              </div>
            </TableBodyCell>
          {/if}
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</div>

<Modal bind:open={showEditModal} title="Edit Admin" autoclose>
  {#if editingAdmin}
    <form class="space-y-4">
      <div>
        <Label for="admin-name" class="mb-2">Name</Label>
        <Input id="admin-name" placeholder="Admin name" bind:value={editName} />
      </div>

      <div>
        <Label for="admin-role" class="mb-2">Role</Label>
        <Select id="admin-role" bind:value={editRole}>
          {#each roles as role}
            <option value={role}>{role}</option>
          {/each}
        </Select>
      </div>

      <div>
        <Label class="mb-2">Steam ID</Label>
        <Input value={editingAdmin.steamid} readonly />
        <p class="mt-1 text-sm text-gray-500">Steam ID cannot be changed</p>
      </div>

      <ButtonGroup class="mt-6">
        <Button color="blue" onclick={saveAdmin}>Save Changes</Button>
        <Button color="light" onclick={() => (showEditModal = false)}>Cancel</Button>
      </ButtonGroup>
    </form>
  {/if}
</Modal>

<style>
  .table-container {
    overflow-x: auto;
    margin: 1rem 0;
  }
</style>
