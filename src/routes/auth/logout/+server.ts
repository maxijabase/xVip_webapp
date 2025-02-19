import { redirect } from '@sveltejs/kit';

export const GET = async ({ cookies }) => {
  cookies.delete('jwt', { path: '/' });
  redirect(302, '/');
};