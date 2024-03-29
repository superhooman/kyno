'use client';
import { Badge, Flex, Heading, Text } from '@radix-ui/themes';
import React from 'react';

import type { FormattedMovieResult } from '@src/server/kinokz/home/types';

import { translate } from '@src/locales/utils';
import { formatRating } from '@src/utils/formatRating';
import { posterToBackgroundImage } from '@src/utils/posterToBackgroundImage';
import { EMPTY_CHARACTER, EMPTY_MOVIE } from '@src/constants/skeletons';

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
                        backgroundImage: posterToBackgroundImage(movie.poster),
                    }}
                />
                {!isAvailable ? (
                    <Badge variant="solid" className={cls.soon}>
                        {premiereText}
                    </Badge>
                ) : null}
                <AgeRestriction className={cls.ageRestriction} ageRestriction={movie.ageRestriction} />
            </div>
            <Heading className={cls.title} size="3" as="h2">
                {title}
            </Heading>
            {movie.genres && movie.genres.length > 0 ? (
                <Genres genres={movie.genres} locale={locale} />
            ) : null}
            {hasRating ? (
                <Flex align="center" gap="1" className={cls.rating}>
                    <Rating rating={movie.rating} />
                    <Text color="gray" weight="bold" size="1">{formatRating(movie.rating)}</Text>
                </Flex>
            ) : null}
        </Flex>
    );
};

export const MovieSkeleton: React.FC = () => {
    return (
        <Flex direction="column" align="stretch" gap="2" data-skeleton={true}>
            <div className={cls.posterWrapper}>
                <div className={cls.poster} />
            </div>
            <Heading className={cls.title} size="3" as="h2">{EMPTY_CHARACTER}</Heading>
            <Genres isSkeleton genres={EMPTY_MOVIE.genres ?? []} locale="ru" />
            <Flex align="center" gap="1" className={cls.rating}>
                <Rating rating={0} />
                <Text color="gray" weight="bold" size="1">{EMPTY_CHARACTER}</Text>
            </Flex>
        </Flex>
    );
};
