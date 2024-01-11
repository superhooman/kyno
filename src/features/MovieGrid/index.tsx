'use client';
import { Grid } from '@radix-ui/themes';
import Link from 'next/link';

import type { FormattedMovieResult } from '@src/server/kinokz/home/types';

import { Movie, MovieSkeleton } from '@src/components/Movie';
import { useCurrentLocale } from '@src/locales/client';
import { Empty } from '@src/components/Empty';
import { makeHref } from '@src/constants/routes';

interface Props {
    movies?: FormattedMovieResult[];
    isSkeleton?: boolean;
}

export const MovieGrid: React.FC<Props> = ({ movies, isSkeleton }) => {
    const locale = useCurrentLocale();
    const isEmpty = !movies || movies.length === 0;

    if (isEmpty && !isSkeleton) {
        return (
            <Empty />
        );
    }

    const content = isSkeleton ? (
        <>
            {Array.from({ length: 12 }).map((_, index) => (
                <MovieSkeleton key={index} />
            ))}
        </>
    ) : (
        <>
            {movies?.map((movie) => (
                <Link key={movie.id} href={makeHref('movie', { params: { id: movie.id } })}>
                    <Movie
                        movie={movie}
                        locale={locale}
                        clickable
                    />
                </Link>
            ))}
        </>
    );

    return (
        <Grid columns={{
            initial: '2',
            xs: '3',
            sm: '5',
            md: '6',
        }} gap="6">
            {content}
        </Grid>
    );
};
