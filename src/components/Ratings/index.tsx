'use client';

import { Box, Flex, Separator, Text } from '@radix-ui/themes';
import React from 'react';

import type { FormattedFullMovie } from '@src/server/kinokz/movie/types';

import { formatRating } from '@src/utils/formatRating';

import { ImdbIcon, KinoKzIcon, KinopoiskIcon } from '../Icon';
import { Rating } from '../Rating';
import * as cls from './styles.css';


interface RatingsProps {
  movie: Pick<FormattedFullMovie, 'kinopoiskRating' | 'rating' | 'imdbRating' | 'ratingState'>;
}

const ICON_SIZE = 32;

export const Ratings: React.FC<RatingsProps> = ({ movie }) => {
    const kinopoisk = Number.parseFloat(movie.kinopoiskRating ?? '0');
    const imdb = Number.parseFloat(movie.imdbRating ?? '0');

    const items = [
        { Icon: KinoKzIcon, rating: movie.ratingState ? movie.rating : 0, id: 'Kino.kz' },
        { Icon: KinopoiskIcon, rating: kinopoisk, id: 'Kinopoisk' },
        { Icon: ImdbIcon, rating: imdb, id: 'IMDB' },
    ];

    return (
        <Flex direction="column" align="stretch" gap="2">
            {items.map(({ Icon, rating, id }) => (
                <Flex key={id} align="center" gap="2">
                    <Flex gap="2" shrink="0" align="center">
                        <Icon size={ICON_SIZE} />
                        <Text size="2" weight="bold">
                            {id}
                        </Text>
                    </Flex>
                    <Separator className={cls.separator} size="4" />
                    <Flex grow="1" justify="between" align="center" gap="3">
                        <Box width="9">
                            <Rating rating={rating} />
                        </Box>
                        <Text
                            weight="medium"
                            style={{ fontVariantNumeric: 'tabular-nums' }}
                            size="2"
                        >
                            {formatRating(rating)}
                        </Text>
                    </Flex>
                </Flex>
            ))}
        </Flex>
    );
};
