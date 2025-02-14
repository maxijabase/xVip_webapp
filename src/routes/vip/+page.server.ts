import type { PageServerLoad } from './$types';
import { api } from '$lib/services/api';
import type { VIP } from '@/models/vip';
import type { WebUser } from '@/models/webUser';
import type { VIPLog } from '@/models/vipLog';

export const load = (async ({ cookies }) => {
    try {
        const vips = await api.get<VIP[]>('/vip');
        const userCookie = cookies.get('user');
        const user: WebUser | undefined = userCookie ? JSON.parse(userCookie) : undefined;
        
        const vipLogs = (user?.role === 'admin' || user?.role === 'owner')
            ? await api.get<VIPLog[]>('/vip/logs')
            : [];

        return {
            vips,
            vipLogs,
            user
        };
    } catch (error) {
        console.error('Error loading VIP data:', error);
        throw error;
    }
}) satisfies PageServerLoad;
