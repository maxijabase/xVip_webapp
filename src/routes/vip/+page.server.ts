import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
    const userCookie = cookies.get('user');
    const steamUser = userCookie ? JSON.parse(userCookie) : null;
    
    return {
        steamUser
    };
}) satisfies PageServerLoad;