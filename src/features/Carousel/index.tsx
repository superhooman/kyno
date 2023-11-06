'use client';
import React from 'react';
import { Button, Inset } from '@radix-ui/themes';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import Link from 'next/link';

import type { FormattedMovieResult } from '@src/server/kinokz/types';

import { Banner } from '@src/components/Banner';
import { convertImageUrl } from '@src/server/kinokz/images';

import * as cls from './styles.css';

interface Props {
    movies?: FormattedMovieResult[];
    locale?: string;
    maxSize?: number;
}

export const Carousel: React.FC<Props> = ({ movies, locale, maxSize = 3 }) => {
    const [scrollPosition, setScrollPosition] = React.useState(0);
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const highlightedMovies = React.useMemo(() => {
        const list = movies ? [...movies] : [];

        // based on premiere (Date) and rating (number)
        const sortedMovies = list.sort((a, b) => {
            if (a.premiere === b.premiere) {
                return b.rating - a.rating;
            }

            return new Date(b.premiere).getTime() - new Date(a.premiere).getTime();
        });

        return sortedMovies.slice(0, maxSize);
    }, [movies, maxSize]);

    const slidesLength = highlightedMovies.length;

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
        }} className={cls.root}>
            <div ref={scrollRef} className={cls.scroll}>
                <div style={{ width: `${100 * slidesLength}%` }} className={cls.inner}>
                    {highlightedMovies.map((movie) => (
                        <Link href={`/movie/${movie.id}`} className={cls.slide} key={movie.id}>
                            <Banner movie={movie} locale={locale} />
                        </Link>
                    ))}
                </div>
            </div>
            <div className={cls.background}>
                {highlightedMovies.map((movie, index) => (
                    <div
                        style={{
                            backgroundImage: `url(${convertImageUrl(movie.poster, 'p768x385')})`,
                            opacity: calculateSlideOpacity(index),
                        }}
                        className={cls.backgroundImage}
                        key={index}
                    />
                ))}
            </div>
            <Button
                disabled={activeSlide === 0}
                radius="full"
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
                radius="full"
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
                {Array.from({ length: slidesLength }).map((_, index) => (
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
