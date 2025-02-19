import { redirect } from '@sveltejs/kit';
import { API_URL } from '$env/static/private';

export const GET = async () => {
  redirect(302, `${API_URL}/auth/login`);
};
