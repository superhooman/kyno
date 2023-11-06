import type { ErrorResponse, SuccessResponse } from './types';

const BASE_URL = 'https://api.kino.kz';

interface RequestParams<P> {
    method?: 'GET' | 'POST';
    query?: Record<string, string | number>;
    payload?: P;
    contentType?: string;
    locale?: string;
    token?: string;
}

export const stringifyQuery = (query: Record<string, string | number>) => {
    return Object.entries(query).map(([key, value]) => `${key}=${value}`).join('&');
};

const formatUrl = (path: string, query?: Record<string, string | number>) => {
    const isUrl = path.startsWith('http');
    const queryString = query ? `?${stringifyQuery(query)}` : '';

    return `${isUrl ? '' : BASE_URL}${path}${queryString}`;
};

export const request = async <T, P = undefined>(path: string, { query, method = 'GET', payload, contentType, locale, token }: RequestParams<P> = {}): Promise<SuccessResponse<T>> => {
    const url = formatUrl(path, query);
    const headers = new Headers();

    let body: string | undefined;

    if (payload && typeof payload === 'object') {
        headers.append('Content-Type', contentType ?? 'application/json');
        body = JSON.stringify(payload);
    }

    if (locale) {
        headers.append('Accept-Language', locale);
    }

    if (token) {
        headers.append('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(url, {
        method,
        body,
        headers,
        next: {
            revalidate: 60,
        }
    });

    const json = (await response.json()) as SuccessResponse<T> | ErrorResponse;

    if (!json.status) {
        throw new Error(json.message);
    }

    return json;
};
