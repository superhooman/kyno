import type { AuthResult, ProfileResult, RefreshResult, SendOTPResultSuccess } from './types';
import type { ErrorResponse } from '../types';

import { request, requestRaw } from '..';

type InitAuth = { phone: string } | { email: string };

const KINO_KZ_URL = 'https://kino.kz';

const CLIENT_ID = 'kino-kz';
const CLIENT_SECRET = '7W6RDMV49Dm7P0E2KO1U';

export const initAuth = async (data: InitAuth) => {
    const payload = {
        email: 'email' in data ? data.email : undefined,
        phone: 'phone' in data ? data.phone : undefined,
    };

    const response = await requestRaw<SendOTPResultSuccess | ErrorResponse, typeof payload>('/auth/v2/register', {
        payload,
        method: 'POST',
    });

    if (!response.status) {
        throw new Error(response.message);
    }

    return response;
};

export const confirmAuth = async (data: InitAuth, code: string, verificationToken: string) => {
    const response = await request<AuthResult>(`${KINO_KZ_URL}/api/auth/v2/check/otp`, {
        query: {
            ...data,
            code,
        },
        method: 'GET',
        cookies: {
            verification_token: verificationToken,
        }
    });

    return response.result;
};

export const getProfile = async (token: string) => {
    const response = await request<ProfileResult>('/auth/v1/account/refresh', { token });

    return response.result.profile;
};

export const refresh = async (refreshToken: string) => {
    const payload = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'refresh',
        refresh_token: refreshToken,
    };

    const data = await requestRaw<RefreshResult, typeof payload>('/auth/v2/oauth2/token', {
        payload,
        method: 'POST',
    });

    if (data.code !== 0) {
        throw new Error('Invalid refresh token');
    }

    return {
        token: data.data.access_token,
        expires_at_unix: data.data.expires_at_unix,
        refresh_token: data.data.refresh_token,
        refresh_expires_at_unix: data.data.refresh_expires_at_unix,
    };
};
