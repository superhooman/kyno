import { cookies } from 'next/headers';
import { Heading } from '@radix-ui/themes';

import { getCityId } from '@src/constants/cities';
import { getMovies } from '@src/server/kinokz/movies';
import { getI18n } from '@src/locales/server';
import { MovieGrid } from '@src/features/MovieGrid';

export default async function Home() {
    const cityId = getCityId(cookies());
    const movies = await getMovies(cityId);
  
    const t = await getI18n();

    return (
        <>
            <Heading mb="4" size="6" as="h1">{t('main.movies')}</Heading>
            <MovieGrid movies={movies} />
        </>
    );
}

