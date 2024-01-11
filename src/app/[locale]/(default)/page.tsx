import { cookies } from 'next/headers';
import { Flex, Heading } from '@radix-ui/themes';
import { Suspense } from 'react';

import type { Metadata } from 'next';
import type { FormattedMovieResult } from '@src/server/kinokz/home/types';

import { getCityId } from '@src/constants/cities';
import { getCurrentLocale, getI18n } from '@src/locales/server';
import { MovieGrid } from '@src/features/MovieGrid';
import { Carousel } from '@src/features/Carousel';
import { getTitle } from '@src/constants/title';
import { getMovies } from '@src/server/kinokz/home';
import { EMPTY_CHARACTER } from '@src/constants/skeletons';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getI18n();
 
    return {
        title: getTitle(t('main.title')),
        description: t('description'),
    };
}

const pickMovies = (movies: FormattedMovieResult[] = [], length = 3) => {
    const list = [...movies];

    const sorted = list.filter(({ rating }) => rating !== 10 && rating !== 0).sort((a, b) => {
        if (a.premiere === b.premiere) {
            return b.rating - a.rating;
        }

        return new Date(b.premiere).getTime() - new Date(a.premiere).getTime();
    });

    return sorted.slice(0, length);
};

export default function Page() {
    return (
        <Suspense fallback={(
            <Fallback />
        )}>
            <Home />
        </Suspense>
    );
}

function Fallback() {
    return (
        <Flex direction="column" gap="4">
            <Carousel movies={[]} isSkeleton />
            <Heading mt="4" size="6" as="h1">{EMPTY_CHARACTER}</Heading>
            <MovieGrid movies={[]} isSkeleton />
        </Flex>
    );
}

async function Home() {
    const locale = getCurrentLocale();
    const cityId = getCityId(cookies());
    const movies = await getMovies(cityId);
    const pickedMovies = pickMovies(movies);
  
    const t = await getI18n();

    return (
        <Flex direction="column" gap="4">
            <Carousel movies={pickedMovies} locale={locale} />
            <Heading mt="4" size="6" as="h1">{t('main.allMovies')}</Heading>
            <MovieGrid movies={movies} />
        </Flex>
    );
};
