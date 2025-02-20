import type { WebAdmin } from '@/models/webAdmin';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
  const admins = await locals.apiService.get<WebAdmin[]>('/admin');
  console.log(admins);
  return { admins };
}) satisfies PageServerLoad;
