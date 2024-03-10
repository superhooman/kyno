'use client';

import { Badge, Button, Flex, Heading, Inset, Text, VisuallyHidden } from '@radix-ui/themes';
import ReactPlayer from 'react-player';
import React from 'react';
import { Play, Popcorn } from '@phosphor-icons/react';

import type { FormattedFullMovie } from '@src/server/kinokz/movie/types';

import { translate } from '@src/locales/utils';
import { useCurrentLocale, useI18n } from '@src/locales/client';
import { Genres } from '@src/components/Genres';
import { Ratings } from '@src/components/Ratings';
import { AgeRestriction } from '@src/components/AgeRestriction';
import { posterToBackgroundImage } from '@src/utils/posterToBackgroundImage';
import { Details } from '@src/components/Details';
import { ImaxIcon } from '@src/components/Icon';

import * as cls from './styles.css';

interface MovieHeaderProps {
  movie: FormattedFullMovie;
}

export const MovieHeader: React.FC<MovieHeaderProps> = ({ movie }) => {
    const locale = useCurrentLocale();
    const t = useI18n();
    const [showMore, setShowMore] = React.useState(false);

    const more = React.useMemo(() => {
        const kazPremiere = movie.premiereKaz ? (new Date(movie.premiereKaz)).toLocaleDateString('ru-KZ') : '';
        const director = movie.director ? movie.director.split(', ')[0] : '';

        return (
            <Flex width="100%" align="stretch" direction="column" grow="1">
                <Details items={[
                    [t('movie.duration'), t('movie.minutes', { duration: movie.duration })],
                    ...(director ? [[t('movie.director'), director] as [string, string]] : []),
                    ...(movie.production ? [[t('movie.country'), movie.production] as [string, string] ] : []),
                    ...(kazPremiere ? [[t('movie.premiere.kz'), kazPremiere] as [string, string]] : []),
                ]} />
            </Flex>
        );
    }, [t, movie]);

    return (
        <Flex
            direction="column"
            gap={{
                initial: '4',
                sm: '8',
            }}
        >
            <MovieMedia posters={movie.posters} videoUrl={movie.videoUrl} />
            <Flex
                justify="between"
                align={{
                    initial: 'stretch',
                    sm: 'start',
                }}
                gap="4"
                direction={{
                    initial: 'column',
                    sm: 'row',
                }}
            >
                <Flex align="start" direction="column" gap="2" grow="1">
                    <Flex direction="column" gap={{ initial: '1', sm: '2' }}>
                        <Heading
                            size={{
                                initial: '6',
                                sm: '8',
                            }}
                            as="h1"
                        >
                            {translate(movie.name, locale)}
                        </Heading>
                        {locale !== 'en' ? (
                            <Heading weight="medium" color="gray" size="3" as="h2">
                                {movie.name.en}
                            </Heading>
                        ) : null}
                    </Flex>
                    <Flex gap="2" wrap="wrap-reverse">
                        <AgeRestriction ageRestriction={movie.ageRestriction} />
                        {movie.isPremiere ? (
                            <Badge>
                                <Popcorn size={12} />
                                {t('movie.premiere')}
                            </Badge>
                        ) : null}
                        {movie.imax ? (
                            <Badge variant="outline">
                                <ImaxIcon height={8} />
                            </Badge>
                        ) : null}
                        {movie.genres ? <Genres genres={movie.genres} full /> : null}
                    </Flex>
                    <Flex direction="column" gap="2" align="start" width="100%" className={cls.infoContainer}>
                        <Text my="2" as="div" size="2" color="gray" dangerouslySetInnerHTML={{ __html: movie.description }} />
                        {!showMore ? <Button onClick={() => setShowMore(true)} variant="ghost">{t('movie.more')}</Button> : null}
                        {showMore ? more : (
                            <VisuallyHidden>
                                {more}
                            </VisuallyHidden>
                        )}
                    </Flex>
                </Flex>
                <Ratings movie={movie} />
            </Flex>
        </Flex>
    );
};

interface MovieMediaProps {
  posters: FormattedFullMovie['posters'];
  videoUrl: FormattedFullMovie['videoUrl'];
}

const MovieMedia: React.FC<MovieMediaProps> = ({ posters, videoUrl }) => {
    const [showVideo, setShowVideo] = React.useState(false);

    const handleShowVideo = React.useCallback(() => {
        setShowVideo(true);
    }, []);

    return (
        <Inset mt={{
            initial: '-6',
            sm: '0',
        }} mx={{
            initial: '-4',
            sm: '0',
        }} className={cls.inset}>
            <div className={cls.mediaWrapper}>
                <div
                    style={{
                        backgroundImage: posterToBackgroundImage(posters.p1192x597),
                    }}
                    className={cls.mediaContainer}
                />
                <div className={cls.mediaContent}>
                    {videoUrl && !showVideo ? (
                        <button onClick={handleShowVideo} aria-label="Play" className={cls.play}>
                            <Play weight="fill" size={32} />
                        </button>
                    ) : null}
                    {showVideo && videoUrl ? (
                        <ReactPlayer
                            playing
                            playsinline
                            style={{ backgroundColor: '#000' }}
                            width="100%"
                            height="100%"
                            url={videoUrl}
                            controls
                            config={{
                                file: {
                                    attributes: {
                                        controlsList: 'nodownload',
                                    }
                                }
                            }}
                        />
                    ) : null}
                </div>
            </div>
        </Inset>
    );
};
