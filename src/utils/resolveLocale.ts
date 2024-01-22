import { cookies, headers } from 'next/headers';

import { DEFAULT_LOCALE, LOCALE_COOKIE, LOCALE_HEADER } from '@src/constants/i18n';

export const resolveLocale = () => {
    const localeCookie = cookies().get(LOCALE_COOKIE)?.value;
    const localeHeader = headers().get(LOCALE_HEADER);

    return localeCookie || localeHeader || DEFAULT_LOCALE;
};
