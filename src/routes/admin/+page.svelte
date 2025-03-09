<script lang="ts">
  import { Heading } from 'flowbite-svelte';
  import AdminList from '@/components/AdminList.svelte';
  import type { PageData } from './$types';
  import type { WebAdmin } from '@/models/webAdmin';

  let { data }: { data: PageData } = $props();
  let admins = $state(data.admins ?? []);
  let user = $state(data.user);

  async function handleAdminUpdate(admin: WebAdmin) {
    // TODO
  }

  async function handleAdminDelete(admin: WebAdmin) {
    // TODO
  }
</script>

<div class="container mx-auto">
  <Heading>Admins</Heading>
  <AdminList 
    admins={admins} 
    user={user} 
    onUpdate={handleAdminUpdate}
    onDelete={handleAdminDelete}
  />
</div>