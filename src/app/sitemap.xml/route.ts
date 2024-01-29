import { cookies } from 'next/headers';

import { getCityId } from '@src/constants/cities';
import { DOMAIN } from '@src/constants/domain';
import { LOCALES } from '@src/constants/i18n';
import { getMovies } from '@src/server/kinokz/home';
import { formatDateString } from '@src/utils/date';

export const dynamic = 'force-dynamic';

const generatePage = (path: string, date: string) => {
    return [
        '<url>',
        `<loc>https://${DOMAIN}/${path}</loc>`,
        `<lastmod>${date}</lastmod>`,
        ...(Object.values(LOCALES).map((locale) => (
            `<xhtml:link xmlns:xhtml="http://www.w3.org/1999/xhtml" rel="alternate" hreflang="ru" href="https://${DOMAIN}/${locale}/${path}" />`
        ))),
        '</url>'
    ];
};

export async function GET() {
    const cityId = getCityId(cookies());
    const movies = (await getMovies(cityId)) ?? [];
    const currentDate = formatDateString(new Date());

    return new Response([
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...generatePage('', currentDate),
        ...movies?.flatMap((movie) => generatePage(`movie/${movie.id}`, currentDate)).flat(),
        '</urlset>'
    ].join('\n'));
}
