import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	let token = event.cookies.get('jwt');

	if (token) {
		event.request.headers.set('Authorization', `Bearer ${token}`);
	} else if (
		!event.url.pathname.startsWith('/auth') &&
		!event.url.pathname.startsWith('/public') &&
		event.url.pathname !== '/'
	) {
		throw redirect(301, '/');
	}

	return resolve(event);
};
