import { style } from '@vanilla-extract/css';

import { media } from '@src/styles/breakpoints';

const BLUR_SIZE = 10;

export const root = style({
    position: 'relative',

    borderRadius: 'var(--radius-5)',
    overflow: 'hidden',
    boxShadow: '0 0 0 1px var(--gray-a6)',

    '@media': {
        [media.down('sm')]: {
            borderRadius: 0,
        }
    }
});

export const scroll = style({
    overflow: 'auto',
    scrollSnapType: 'x mandatory',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',

    backgroundImage: 'linear-gradient(to bottom, var(--black-a1), var(--black-a8))',
    backdropFilter: `blur(${BLUR_SIZE}px) brightness(0.8)`,

    '::-webkit-scrollbar': {
        display: 'none',
    },
});

export const inner = style({
    display: 'flex',
    flexDirection: 'row',
});

export const slide = style({
    display: 'block',
    width: '100%',
    scrollSnapAlign: 'start',
});

export const dots = style({
    position: 'absolute',
    bottom: 'var(--space-2)',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1,
});

export const dot = style({
    display: 'inline-block',
    width: 6,
    height: 6,
    margin: '0 2px',
    borderRadius: '50%',
    backgroundColor: 'var(--white-a6)',

    selectors: {
        '&[data-active="true"]': {
            backgroundColor: 'var(--amber-9)',
        }
    }
});

export const navButton = style({
    position: 'absolute',
    top: 0,
    height: '100%',
    bottom: 0,
    zIndex: 1,
    color: 'var(--white-a10)',
    borderRadius: 'var(--radius-5)',

    '@media': {
        [media.down('sm')]: {
            display: 'none',
        },
    },

    selectors: {
        '&:not(:hover), &:disabled': {
            backgroundColor: 'transparent',
        },
        '&:disabled': {
            color: 'var(--white-a6)',
        },
        '&[data-direction="prev"]': {
            left: 0,
        },
        '&[data-direction="next"]': {
            right: 0,
        },
    }
});

export const background = style({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    backgroundColor: 'var(--black-a8)',
});

export const backgroundImage = style({
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: -BLUR_SIZE,
});
