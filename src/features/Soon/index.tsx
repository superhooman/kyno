'use client';
import React from 'react';
import format from 'date-fns/format';
import { Box, Flex, Heading, Text } from '@radix-ui/themes';

import type { FormattedMovieResult } from '@src/server/kinokz/home/types';

import { Empty } from '@src/components/Empty';
import { useCurrentLocale, useI18n } from '@src/locales/client';
import { getDateLocale } from '@src/locales/date';
import { EMPTY_CHARACTER } from '@src/constants/skeletons';

import { MovieGrid } from '../MovieGrid';
import * as cls from './styles.css';

interface Props {
    movies?: FormattedMovieResult[];
    isSkeleton?: boolean;
}

export const Soon: React.FC<Props> = ({ movies, isSkeleton }) => {
    const t = useI18n();
    const locale = useCurrentLocale();

    const formatDate = React.useCallback((date: string) => {
        return format(new Date(date), 'd MMMM', { locale: getDateLocale(locale) });
    }, [locale]);

    const data = React.useMemo<Record<string, FormattedMovieResult[]>>(() => {
        if (!movies) {
            return {};
        }

        return movies.reduce<Record<string, FormattedMovieResult[]>>((acc, movie) => {
            const key = movie.premiere.split('T')[0];

            if (!acc[key]) {
                acc[key] = [];
            }

            acc[key].push(movie);

            return acc;
        }, {});
    }, [movies]);

    if (isSkeleton) {
        return (
            <>
                <Heading mt="4" size="6" as="h1">{EMPTY_CHARACTER}</Heading>
                <MovieGrid isSkeleton />
            </>
        );
    }

    if (!movies || movies.length === 0) {
        return (
            <Empty />
        );
    }

    return (
        <>
            <Heading mb="4" size="6" as="h1">{t('nav.soon')}</Heading>
            {Object.entries(data).map(([date, movies]) => (
                <Box position="relative" key={date}>
                    <Flex
                        py={{
                            initial: '2',
                            sm: '3',
                        }}
                        px={{
                            initial: '4',
                        }}
                        mx={{
                            initial: '-4',
                        }}
                        className={cls.dateHeader}
                        justify="between"
                        align="center"
                    >
                        <Text size="3" weight="bold">{formatDate(date)}</Text>
                    </Flex>
                    <Box py="5">
                        <MovieGrid movies={movies} />
                    </Box>
                </Box>
            ))}
        </>
    );
};
