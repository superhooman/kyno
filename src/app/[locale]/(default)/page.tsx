import { cookies } from 'next/headers';
import { Flex, Heading } from '@radix-ui/themes';

import type { Metadata } from 'next';

import { getCityId } from '@src/constants/cities';
import { getMovies } from '@src/server/kinokz/movies';
import { getCurrentLocale, getI18n } from '@src/locales/server';
import { MovieGrid } from '@src/features/MovieGrid';
import { Carousel } from '@src/features/Carousel';
import { getTitle } from '@src/constants/title';

export async function generateMetadata(): Promise<Metadata> {
    const i18n = await getI18n();
 
    return {
        title: getTitle(i18n('main.title')),
        description: i18n('description'),
    };
}

export default async function Home() {
    const locale = getCurrentLocale();
    const cityId = getCityId(cookies());
    const movies = await getMovies(cityId);
  
    const t = await getI18n();

    return (
        <Flex direction="column" gap="4">
            <Carousel movies={movies} locale={locale} />
            <Heading mt="4" size="6" as="h1">{t('main.allMovies')}</Heading>
            <MovieGrid movies={movies} />
        </Flex>
    );
}

