import type { WebUser } from '@/models/webUser';
import type { LayoutServerLoad } from './$types';
import { jwtDecode } from 'jwt-decode';

export const load = (async ({ cookies }) => {
  const token = cookies.get('jwt');
  const user: WebUser | undefined = token ? jwtDecode(token) : undefined;
  return user;
}) satisfies LayoutServerLoad;
