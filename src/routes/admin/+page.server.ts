import type { WebAdmin } from '@/models/webAdmin';
import type { PageServerLoad } from './$types';
import type { WebUser } from '@/models/webUser';
import { jwtDecode } from 'jwt-decode';

export const load = (async ({ locals, cookies }) => {
  const admins = await locals.apiService.get<WebAdmin[]>('/admin');
  const token = cookies.get('jwt');
  const user: WebUser | undefined = token ? jwtDecode(token) : undefined;
  return { admins, user };
}) satisfies PageServerLoad;
