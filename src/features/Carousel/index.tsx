'use client';
import React from 'react';
import { Button, Inset } from '@radix-ui/themes';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import Link from 'next/link';

import type { FormattedMovieResult } from '@src/server/kinokz/home/types';

import { Banner } from '@src/components/Banner';
import { convertImageUrl } from '@src/server/kinokz/utils/images';
import { makeHref } from '@src/constants/routes';

import * as cls from './styles.css';

interface Props {
    movies: FormattedMovieResult[];
    locale?: string;
}

export const Carousel: React.FC<Props> = ({ movies, locale }) => {
    const [scrollPosition, setScrollPosition] = React.useState(0);
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const slidesLength = movies.length;

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
                    {movies.map((movie) => (
                        <Link href={makeHref('movie', { params: { id: movie.id } })} className={cls.slide} key={movie.id}>
                            <Banner movie={movie} locale={locale} />
                        </Link>
                    ))}
                </div>
            </div>
            <div className={cls.background}>
                {movies.map((movie, index) => (
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
