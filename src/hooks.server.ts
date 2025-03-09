import { ApiService } from '@/services/api';
import { type HandleFetch, type Handle, redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.apiService = new ApiService(event.fetch);
  const response = await resolve(event);
  return response;
};

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
  const token = event.cookies.get('jwt');
  if (token) {
    request.headers.set('Authorization', `Bearer ${token}`);
  }
  const response = await fetch(request);
  if (response.status === 401) {
    event.cookies.set('returnTo', event.url.pathname, { path: '/' });
    return redirect(303, '/auth/login');
  }
  return response;
};
