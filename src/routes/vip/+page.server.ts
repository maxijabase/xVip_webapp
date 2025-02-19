import type { PageServerLoad } from './$types';
import type { VIP } from '@/models/vip';
import type { WebUser } from '@/models/webUser';
import type { VIPLog } from '@/models/vipLog';
import { jwtDecode } from 'jwt-decode';

export const load = (async ({ locals, cookies }) => {
  // get vips
  const vipsPromise = await locals.apiService.get<VIP[]>('/vip');

  // get logs if user is allowed to view them
  const token = cookies.get('jwt');
  const user: WebUser | undefined = token ? jwtDecode(token) : undefined;
  let logsPromise: VIPLog[] = [];
  if (user && (user.role === 'admin' || user.role === 'owner')) {
    logsPromise = await locals.apiService.get<VIPLog[]>('/vip/logs').then((logs) => logs ?? []);
  }

  return { vipsPromise, logsPromise, user };
}) satisfies PageServerLoad;
