import { createI18nMiddleware } from 'next-international/middleware';
import { NextResponse, type NextRequest } from 'next/server';

import { CITY_COOKIE, CITY_COOKIE_MAX_AGE, getCityId } from './constants/cities';
import { DEFAULT_LOCALE, LOCALES } from './constants/i18n';
import { isProduction } from './utils/isProduction';
import { COOKIE_NAME, PASSWORD } from './constants/passwords';
 
const I18nMiddleware = createI18nMiddleware({
    locales: Object.values(LOCALES),
    defaultLocale: DEFAULT_LOCALE,
});

const checkPassword = (request: NextRequest) => {
    if (!isProduction()) {
        return false;
    }

    const password = request.cookies.get(COOKIE_NAME)?.value;

    return password !== PASSWORD;
};

export function middleware(request: NextRequest) {
    let savePass = false;
    const toProtected = checkPassword(request);

    const query = new URL(request.url).searchParams;

    if (query.get('password') === PASSWORD) {
        savePass = true;
    } else {
        if (toProtected) {
            const url = new URL(request.url);
    
            if (!url.pathname.includes('/message')) {
                return NextResponse.redirect(new URL('/message', request.url));
            }
        }
    }

    const cityId = getCityId(request.cookies, request.geo?.city);

    const response = I18nMiddleware(request);

    request.cookies.set({
        name: CITY_COOKIE,
        value: String(cityId),
    });

    response.cookies.set({
        name: CITY_COOKIE,
        value: String(cityId),
        maxAge: CITY_COOKIE_MAX_AGE,
    });

    if (savePass) {
        response.cookies.set({
            name: COOKIE_NAME,
            value: PASSWORD,
            maxAge: CITY_COOKIE_MAX_AGE,
        });
    }

    return response;
}

export const config = {
    matcher: ['/((?!api|static|.*\\..*|_next|icons|favicon.ico|robots.txt|sitemap.xml|_hive).*)']
};
