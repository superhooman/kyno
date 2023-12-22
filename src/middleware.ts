import { createI18nMiddleware } from 'next-international/middleware';
import { NextResponse, type NextRequest } from 'next/server';

import { CITY_COOKIE, getCityId } from './constants/cities';
import { COOKIE_NAME, PASSWORD } from './constants/password';
import { isProduction } from './utils/isProduction';
 
const I18nMiddleware = createI18nMiddleware({
    locales: ['ru', 'en', 'kk'],
    defaultLocale: 'ru'
});

const checkPassword = (request: NextRequest) => {
    if (!isProduction()) {
        return false;
    }

    const password = request.cookies.get(COOKIE_NAME)?.value;

    return password !== PASSWORD;
};

export function middleware(request: NextRequest) {
    const toProtected = checkPassword(request);

    if (toProtected) {
        const url = new URL(request.url);

        if (!url.pathname.includes('/protected')) {
            return NextResponse.redirect(new URL('/protected', request.url));
        }
    }

    const cityId = getCityId(request.cookies, request.geo?.city);

    const response = I18nMiddleware(request);

    request.cookies.set(CITY_COOKIE, String(cityId));
    response.cookies.set(CITY_COOKIE, String(cityId));

    return response;
}

export const config = {
    matcher: ['/((?!api|static|.*\\..*|_next|icons|favicon.ico|robots.txt).*)']
};
