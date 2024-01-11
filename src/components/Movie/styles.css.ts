import { style } from '@vanilla-extract/css';

import { createTransition } from '@src/styles/transitions';
import { skeleton } from '@src/styles/common.css';

export const clickable = style({
    padding: 'var(--space-3)',
    margin: 'calc(-1 * var(--space-3))',
    cursor: 'pointer',
    borderRadius: 'var(--radius-4)',
    WebkitTapHighlightColor: 'transparent',
    transformOrigin: 'center',

    transition: createTransition({ property: 'background-color', options: { duration: 'fast' } }),

    ':hover': {
        backgroundColor: 'var(--gray-a2)',
    },

    ':active': {
        backgroundColor: 'var(--gray-a3)',
    }
});

export const posterWrapper = style({
    position: 'relative',
});

export const poster = style({
    width: '100%',
    paddingTop: '144%',
    backgroundColor: 'var(--gray-a3)',
    borderRadius: 'var(--radius-3)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    boxShadow: '0 0 0 1px var(--gray-a6)',

    selectors: {
        ['[data-skeleton=\'true\'] &']: {
            ...skeleton,
            boxShadow: 'none',
        },
    }
});

export const ageRestriction = style({
    position: 'absolute',
    top: 'var(--space-2)',
    right: 'var(--space-2)',
});

export const soon = style({
    display: 'block',
    position: 'absolute',
    bottom: 'var(--space-2)',
    left: 'var(--space-2)',
    right: 'var(--space-2)',
    textAlign: 'center',
});

export const title = style({
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',

    selectors: {
        ['[data-skeleton=\'true\'] &']: {
            backgroundColor: 'var(--gray-a3)',
            borderRadius: 'var(--radius-1)',
            width: 96,
            ...skeleton,
        },
    }
});

export const rating = style({
    maxWidth: 96,
});
