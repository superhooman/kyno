'use client';
import { Flex, Heading, Text } from '@radix-ui/themes';
import React from 'react';

import type { FormattedMovieResult } from '@src/server/kinokz/types';

import { translate } from '@src/locales/utils';
import { formatRating } from '@src/utils/formatRating';

import * as cls from './styles.css';
import { Rating } from '../Rating';
import { AgeRestriction } from '../AgeRestriction';
import { Genres } from '../Genres';

interface Props {
    movie: FormattedMovieResult;
    locale?: string;
}

export const Banner: React.FC<Props> = ({ movie, locale }) => {
    return (
        <div className={cls.wrapper}>
            <div className={cls.background} />
            <Flex
                py={{
                    initial: '6',
                    md: '8',
                }}
                px={{
                    initial: '4',
                    sm: '8',
                }}
                direction={{
                    initial: 'row',
                    sm: 'column'
                }}
                gap={{ initial: '5', md: '8' }}
                align={{ initial: 'center', sm: 'start' }}
                justify={{ initial: 'start', sm: 'end' }}
                className={cls.content}
            >
                <div className={cls.posterWrapper}>
                    <div
                        className={cls.poster}
                        style={{
                            backgroundImage: `url(${movie.poster})`,
                        }}
                    />
                </div>
                <Flex direction="column" gap="3">
                    <Heading size={{
                        initial: '6',
                        sm: '7',
                        md: '8'
                    }} as="h2">{translate(movie.name, locale)}</Heading>
                    {movie.genres ? <Genres color="gray" highContrast variant="solid" genres={movie.genres} locale={locale} /> : null}
                    <Flex gap={{ initial: '2', sm: '3', md: '4' }} align="center">
                        <AgeRestriction size={{ initial: '1', md: '2' }} ageRestriction={movie.ageRestriction} />
                        {movie.ratingState && movie.rating > 0 ? (
                            <Flex align="center" gap="2" className={cls.rating}>
                                <Rating rating={movie.rating} />
                                <Text size={{
                                    initial: '2',
                                    sm: '3',
                                    md: '4',
                                }} weight="bold">{formatRating(movie.rating)}</Text>
                            </Flex>
                        ) : null}
                    </Flex>
                </Flex>
            </Flex>
        </div>
    );
};
