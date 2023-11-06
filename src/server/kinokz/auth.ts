import type { AuthResult } from './types';

import { request } from '.';

type InitAuth = { phone: string } | { email: string };

const KINO_KZ_URL = 'https://kino.kz';

export const initAuth = async (data: InitAuth) => {
    const payload = {
        email: 'email' in data ? data.email : undefined,
        phone: 'phone' in data ? data.phone : undefined,
    };

    await request('/auth/v2/register', {
        payload,
        method: 'POST',
    });
};

export const confirmAuth = async (data: InitAuth, code: string) => {
    const response = await request<AuthResult>(`${KINO_KZ_URL}/api/auth/v2/check/otp`, {
        query: {
            ...data,
            code,
        },
        method: 'GET',
    });

    return response.result;
};

export const getProfile = async (token: string) => {
    await request('/auth/v1/account/refresh', { token });
};
