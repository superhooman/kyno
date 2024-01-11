'use client';
import React from 'react';
import { Button, Inset } from '@radix-ui/themes';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import Link from 'next/link';

import type { FormattedMovieResult } from '@src/server/kinokz/home/types';

import { Banner } from '@src/components/Banner';
import { convertImageUrl } from '@src/server/kinokz/utils/images';
import { makeHref } from '@src/constants/routes';
import { posterToBackgroundImage } from '@src/utils/posterToBackgroundImage';
import { EMPTY_MOVIE } from '@src/constants/skeletons';

import * as cls from './styles.css';

interface Props {
    movies: FormattedMovieResult[];
    locale?: string;
    isSkeleton?: boolean;
}

export const Carousel: React.FC<Props> = ({ movies, locale, isSkeleton }) => {
    const items = React.useMemo(() => isSkeleton ? [EMPTY_MOVIE] : movies, [movies, isSkeleton]);
    const [scrollPosition, setScrollPosition] = React.useState(0);
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const slidesLength = items.length;

    React.useEffect(() => {
        const handleScroll = (e: Event) => {
            if (e.target instanceof Element) {
                const { scrollLeft, scrollWidth, clientWidth } = e.target;

                const scrollPosition = scrollLeft / (scrollWidth - clientWidth);
                setScrollPosition(scrollPosition);
            }
        };

        const element = scrollRef.current;

        if (element) {
            element.addEventListener('scroll', handleScroll, { passive: true });
        }

        return () => {
            if (element) {
                element.removeEventListener('scroll', handleScroll);
            }
        };
    }, [slidesLength]);

    const handleScrollNext = React.useCallback(() => {
        const element = scrollRef.current;

        if (element) {
            element.scrollBy({
                left: element.clientWidth,
                behavior: 'smooth',
            });
        }
    }, []);

    const handleScrollPrev = React.useCallback(() => {
        const element = scrollRef.current;

        if (element) {
            element.scrollBy({
                left: -element.clientWidth,
                behavior: 'smooth',
            });
        }
    }, []);

    const activeSlide = React.useMemo(() => Math.round(scrollPosition * (slidesLength - 1)), [scrollPosition, slidesLength]);

    const calculateSlideOpacity = React.useCallback((index: number) => {
        const position = scrollPosition * (slidesLength - 1);
        const distance = Math.abs(position - index);

        return Math.max(1 - distance, 0);
    }, [scrollPosition, slidesLength]);

    if (slidesLength < 1) {
        return null;
    }

    return (
        <Inset mt={{
            initial: '-6',
            sm: '0',
        }} mx={{
            initial: '-4',
            sm: '0',
        }} className={cls.root} data-skeleton={isSkeleton}>
            <div ref={scrollRef} className={cls.scroll}>
                <div style={{ width: `${100 * slidesLength}%` }} className={cls.inner}>
                    {items.map((movie) => (
                        <Link href={isSkeleton ? '#' : makeHref('movie', { params: { id: movie.id } })} className={cls.slide} key={movie.id}>
                            <Banner movie={movie} locale={locale} isSkeleton={isSkeleton} />
                        </Link>
                    ))}
                </div>
            </div>
            <div className={cls.background}>
                {items.map((movie, index) => (
                    <div
                        style={{
                            backgroundImage: posterToBackgroundImage(convertImageUrl(movie.poster, 'p768x385')),
                            opacity: calculateSlideOpacity(index),
                        }}
                        className={cls.backgroundImage}
                        key={index}
                    />
                ))}
            </div>
            <Button
                disabled={activeSlide === 0}
                variant="soft"
                highContrast
                color="gray"
                size="1"
                onClick={handleScrollPrev}
                data-direction="prev"
                className={cls.navButton}
            >
                <CaretLeft />
            </Button>
            <Button
                disabled={activeSlide === slidesLength - 1}
                variant="soft"
                highContrast
                color="gray"
                size="1"
                onClick={handleScrollNext}
                data-direction="next"
                className={cls.navButton}
            >
                <CaretRight />
            </Button>
            <div className={cls.dots}>
                {Array.from({ length: isSkeleton ? 3 : slidesLength }).map((_, index) => (
                    <div
                        key={index}
                        className={cls.dot}
                        data-active={index === activeSlide}
                    />
                ))}
            </div>
        </Inset>
    );
};
