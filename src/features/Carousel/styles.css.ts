import { style } from '@vanilla-extract/css';

import { media } from '@src/styles/breakpoints';

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
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
    padding: 0,
    width: 'var(--space-5)',

    '@media': {
        [media.down('sm')]: {
            display: 'none',
        },
    },

    selectors: {
        '&[data-direction="prev"]': {
            left: 'var(--space-3)',
        },
        '&[data-direction="next"]': {
            right: 'var(--space-3)',
        },
    }
});
