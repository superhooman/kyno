import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { Flex } from '@radix-ui/themes';
import { stripHtml } from 'string-strip-html';

import type { Metadata } from 'next';

import { getCurrentLocale } from '@src/locales/server';
import { getMovie, getSessions } from '@src/server/kinokz/movie';
import { MovieHeader } from '@src/features/MovieHeader';
import { translate } from '@src/locales/utils';
import { getTitle } from '@src/constants/title';
import { Sessions } from '@src/features/Sessions';
import { getCityId } from '@src/constants/cities';
import { DOMAIN } from '@src/constants/domain';


interface Props {
  params: { id: string },
  searchParams: {
    date?: string,
  }
}

const getMovieById = async (id: string, locale: string) => {
    const movieId = Number(id);

    if (Number.isNaN(movieId)) {
        return null;
    }

    const movie = await getMovie(movieId, locale);

    return movie;
};

const getDateFromParams = (date: string | undefined) => {
    if (!date) {
        return;
    }

    const dateObj = new Date(date);

    if (Number.isNaN(dateObj.getTime())) {
        return;
    }

    return date;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const locale = getCurrentLocale();
    const movie = await getMovieById(params.id, locale);

    if (!movie) {
        return notFound();
    }
 
    return {
        metadataBase: new URL(`https://${DOMAIN}/`),
        title: getTitle(translate(movie.name, locale)),
        description: stripHtml(movie.description).result,
        openGraph: {
            images: [movie.posters.p1192x597],
        },
    };
}

export default async function Home({ params, searchParams }: Props) {
    const locale = getCurrentLocale();
    const movie = await getMovieById(params.id, locale);

    if (!movie) {
        return notFound();
    }

    const date = getDateFromParams(searchParams.date);
    const cityId = getCityId(cookies());
    const currentDate = (new Date()).toISOString().split('T')[0];

    const { availableDates, sessions } = await getSessions(date ?? currentDate, cityId, movie.id, locale);

    return (
        <Flex direction="column" gap="4">
            <MovieHeader movie={movie} />

            <Sessions
                availableDates={availableDates ?? []}
                today={currentDate}
                date={date ?? currentDate}
                sessions={sessions}
                movie={movie}
                cityId={cityId}
            />
        </Flex>
    );
}

export const runtime = 'edge';
