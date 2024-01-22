import { z } from 'zod';
import cookie from 'cookie';

import type { NextRequest } from 'next/server';
import type { AuthResult } from '../kinokz/auth/types';

import { refresh } from '../kinokz/auth';

const COOKIE_NAME = 'session';

// One week
const MAX_AGE = 60 * 60 * 24 * 7;

export const _setSessionHeaders = (headers: Headers, value?: string) => {
    if (value) {
        headers.append('Set-Cookie', cookie.serialize(COOKIE_NAME, value, {
            maxAge: MAX_AGE,
            httpOnly: true,
            path: '/',
        }));
    } else {
        headers.append('Set-Cookie', cookie.serialize(COOKIE_NAME, '', {
            maxAge: -1,
            path: '/',
        }));
    }
};

export const _getSessionFromCookie = (req: NextRequest) => {
    const cookie = req.cookies.get(COOKIE_NAME);

    if (!cookie) {
        return;
    }

    return cookie.value;
};

export const clearSession = (headers: Headers) => {
    _setSessionHeaders(headers);
};

export const encodeSession = (tokens: AuthResult) => {
    return btoa(JSON.stringify(tokens));
};

const sessionSchema = z.object({
    token: z.string(),
    expires_at_unix: z.number(),
    refresh_token: z.string(),
    refresh_expires_at_unix: z.number(),
});

export const decodeSession = (session: string) => {
    return sessionSchema.parse(JSON.parse(atob(session)));
};

export const setSession = (headers: Headers, tokens: AuthResult) => {
    const value = encodeSession(tokens);
    _setSessionHeaders(headers, value);
};

export const getSession = async (req: NextRequest, headers: Headers) => {
    const session = _getSessionFromCookie(req);

    if (!session) {
        return;
    }

    try {
        const now = Date.now();
        let result = decodeSession(session);

        // check if access_token is expired
        if (result.expires_at_unix * 1000 < now) {

            if (result.refresh_expires_at_unix * 1000 < now) {
                throw new Error('Refresh token expired');
            }

            result = await refresh(result.refresh_token);

            setSession(headers, result);
        }

        return result;
    } catch (e) {
        clearSession(headers);
        return;
    }
};
