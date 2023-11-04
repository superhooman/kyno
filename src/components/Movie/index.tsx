'use client';
import { Badge, Box, Flex, Heading, Tooltip } from '@radix-ui/themes';
import React from 'react';

import type {
    FormattedMovieResult,
} from '@src/server/kinokz/types';

import { translate } from '@src/locales/utils';

import * as cls from './styles.css';
import { Rating } from '../Rating';
import { Genres } from '../Genres';
import { AgeRestriction } from '../AgeRestriction';

interface Props {
  movie: FormattedMovieResult;
  locale?: string;
  clickable?: boolean;
}

export const Movie: React.FC<Props> = ({ movie, locale, clickable }) => {
    const ratingText = Math.round(movie.rating * 10) / 10;

    const hasRating = movie.ratingState && movie.rating > 0;

    const title = translate(movie.name, locale);

    const isAvailable = React.useMemo(() => {
        const today = new Date();
        const premiere = new Date(movie.premiere);

        return premiere <= today;
    }, [movie.premiere]);

    const premiereText = React.useMemo(() => {
        const premiere = new Date(movie.premiere);

        return premiere.toLocaleDateString('ru-RU');
    }, [movie.premiere]);

    return (
        <Flex className={clickable ? cls.clickable : ''} direction="column" align="stretch" gap="2">
            <div className={cls.posterWrapper}>
                <div
                    className={cls.poster}
                    style={{
                        backgroundImage: `url(${movie.poster})`,
                    }}
                />
                {!isAvailable ? (
                    <Badge variant="solid" className={cls.soon}>
                        {premiereText}
                    </Badge>
                ) : null}
                <AgeRestriction className={cls.ageRestriction} ageRestriction={movie.ageRestriction} />
            </div>
            <Tooltip arrowPadding={8} side="top" align="start" content={title}>
                <Heading className={cls.title} size="3" as="h4">
                    {title}
                </Heading>
            </Tooltip>
            {movie.genres && movie.genres.length > 0 ? (
                <Genres genres={movie.genres} locale={locale} />
            ) : null}
            {hasRating ? (
                <Tooltip side="right" content={ratingText}>
                    <Box className={cls.rating}>
                        <Rating rating={movie.rating} />
                    </Box>
                </Tooltip>
            ) : null}
        </Flex>
    );
};
