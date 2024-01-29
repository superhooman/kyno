import { createI18nMiddleware } from 'next-international/middleware';
import { type NextRequest } from 'next/server';

import { CITY_COOKIE, CITY_COOKIE_MAX_AGE, getCityId } from './constants/cities';
import { DEFAULT_LOCALE, LOCALES } from './constants/i18n';
 
const I18nMiddleware = createI18nMiddleware({
    locales: Object.values(LOCALES),
    defaultLocale: DEFAULT_LOCALE,
});

export function middleware(request: NextRequest) {
    const cityId = getCityId(request.cookies, request.geo?.city);

    const response = I18nMiddleware(request);

    response.headers.set('x-pathname', request.nextUrl.pathname);

    request.cookies.set({
        name: CITY_COOKIE,
        value: String(cityId),
    });

    response.cookies.set({
        name: CITY_COOKIE,
        value: String(cityId),
        maxAge: CITY_COOKIE_MAX_AGE,
    });


    return response;
}

export const config = {
    matcher: ['/((?!api|static|.*\\..*|_next|icons|favicon.ico|robots.txt|sitemap.xml|_hive).*)']
};
