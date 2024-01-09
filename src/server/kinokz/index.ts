import https from 'https';

import fetch from 'node-fetch';

import type { ErrorResponse, SuccessResponse } from './types';

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});

const BASE_URL = 'https://api.kino.kz';

interface RequestParams<P> {
    method?: 'GET' | 'POST';
    query?: Record<string, string | number>;
    payload?: P;
    contentType?: string;
    locale?: string;
    token?: string;
    cookies?: Record<string, string>;
    headers?: Record<string, string>;
}

export const stringifyQuery = (query: Record<string, string | number>) => {
    return Object.entries(query).map(([key, value]) => `${key}=${value}`).join('&');
};

const formatUrl = (path: string, query?: Record<string, string | number>) => {
    const isUrl = path.startsWith('http');
    const queryString = query ? `?${stringifyQuery(query)}` : '';

    return `${isUrl ? '' : BASE_URL}${path}${queryString}`;
};

export const requestRaw = async <T, P = undefined>(path: string, { query, method = 'GET', payload, contentType, locale, token, cookies, headers: addHeaders }: RequestParams<P> = {}): Promise<T> => {
    const url = formatUrl(path, query);
    let headers: Record<string, string> = {};

    let body: string | undefined;

    if (payload && typeof payload === 'object') {
        headers['Content-Type'] = contentType ?? 'application/json';
        body = JSON.stringify(payload);
    }

    if (locale) {
        headers['Accept-Language'] = locale;
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    if (cookies) {
        headers['Cookie'] = Object.entries(cookies).map(([key, value]) => `${key}=${value}`).join('; ');
    }

    if (addHeaders) {
        headers = {
            ...headers,
            ...addHeaders,
        };
    }

    const response = await fetch(url, {
        method,
        body,
        headers,
        agent: httpsAgent,
    });

    const json = (await response.json()) as T;

    return json;
};

export const request = async <T, P = undefined>(path: string, params?: RequestParams<P>): Promise<SuccessResponse<T>> => {
    const json = (await requestRaw<T, P>(path, params)) as SuccessResponse<T> | ErrorResponse;

    if (!json.status) {
        throw new Error(json.message);
    }

    return json as SuccessResponse<T>;
};
