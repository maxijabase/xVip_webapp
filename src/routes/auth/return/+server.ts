import { error, redirect } from '@sveltejs/kit';
import { jwtDecode } from 'jwt-decode';

export const GET = async ({ url, cookies }) => {
  const token = url.searchParams.get('token');
  
  if (token) {
    cookies.set('jwt', token, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 72 // 72 hours
    });

    const user = JSON.stringify(jwtDecode(token));
    cookies.set('user', user, {
        path: '/',
        httpOnly: false, // So we can access it client-side if needed
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24
      });
    
    throw redirect(302, '/');
  }

  throw error(500, 'login failure');
};