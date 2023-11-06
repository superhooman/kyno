import type { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export enum Theme {
    System = 'system',
    Light = 'light',
    Dark = 'dark',
}

export const THEME_COOKIE_NAME = 'theme';

const defaultTheme = Theme.System;

export const getTheme = (cookies?: RequestCookies | ReadonlyRequestCookies): Theme => {
    if (!cookies) {
        return defaultTheme;
    }

    const themeCookie = cookies.get(THEME_COOKIE_NAME);

    const value = themeCookie?.value;

    if (!value) {
        return defaultTheme;
    }

    if (Object.values(Theme).includes(value as Theme)) {
        return value as Theme;
    }

    return defaultTheme;
};
