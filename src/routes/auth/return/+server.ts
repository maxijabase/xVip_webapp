import { error, redirect } from '@sveltejs/kit';

export const GET = async ({ url, cookies }) => {
  const token = url.searchParams.get('token');
  const returnTo = cookies.get('returnTo');
  if (token) {
    cookies.set('jwt', token, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 72 // 72 hours
    });
    console.log("we're back, redirecting to", returnTo || '/');
    throw redirect(302, returnTo || '/');
  }

  throw error(500, 'login failure');
};