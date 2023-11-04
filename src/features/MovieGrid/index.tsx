'use client';
import { Grid } from '@radix-ui/themes';
import Link from 'next/link';

import type { FormattedMovieResult } from '@src/server/kinokz/types';

import { Movie } from '@src/components/Movie';
import { useCurrentLocale } from '@src/locales/client';
import { Empty } from '@src/components/Empty';

interface Props {
    movies?: FormattedMovieResult[];
}

export const MovieGrid: React.FC<Props> = ({ movies }) => {
    const locale = useCurrentLocale();
    const isEmpty = !movies || movies.length === 0;

    if (isEmpty) {
        return <Empty />;
    }

    return (
        <Grid columns={{
            initial: '2',
            xs: '3',
            sm: '5',
            md: '6',
        }} gap="6">
            {movies?.map((movie) => (
                <Link key={movie.id} href={`/movie/${movie.id}`}>
                    <Movie
                        movie={movie}
                        locale={locale}
                        clickable
                    />
                </Link>
            ))}
        </Grid>
    );
};
