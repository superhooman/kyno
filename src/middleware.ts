import { createI18nMiddleware } from 'next-international/middleware';
import { type NextRequest } from 'next/server';

import { CITY_COOKIE, getCityId } from './constants/cities';
 
const I18nMiddleware = createI18nMiddleware({
    locales: ['ru', 'en', 'kk'],
    defaultLocale: 'ru'
});

export function middleware(request: NextRequest) {
    const cityId = getCityId(request.cookies, request.geo?.city);

    const response = I18nMiddleware(request);

    request.cookies.set(CITY_COOKIE, String(cityId));
    response.cookies.set(CITY_COOKIE, String(cityId));

    return response;
}

export const config = {
    matcher: ['/((?!api|static|.*\\..*|_next|icons|favicon.ico|robots.txt).*)']
};
