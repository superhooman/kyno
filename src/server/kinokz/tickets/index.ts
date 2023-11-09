import type { Ticket } from './types';

import { request } from '..';

export const getTicketsHistory = async (token: string, locale: string, page = 1, perPage = 100) => {
    const response = await request<{ items: Ticket[] | null }>('/kino-tickets/v1/account/tickets/history', {
        query: {
            page,
            per_page: perPage,
        },
        locale,
        token,
    });

    return response.result.items;
};

export const getActiveTickets = async (token: string, locale: string) => {
    const response = await request<Ticket[] | null>('/kino-tickets/v2/account/tickets/active', {
        locale,
        token,
        query: {
            paid: 'true',
        }
    });

    return response.result;
};
