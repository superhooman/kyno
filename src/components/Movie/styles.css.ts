import { style } from '@vanilla-extract/css';

import { createTransition } from '@src/styles/transitions';

export const clickable = style({
    padding: 'var(--space-3)',
    margin: 'calc(-1 * var(--space-3))',
    cursor: 'pointer',
    borderRadius: 'var(--radius-4)',
    WebkitTapHighlightColor: 'transparent',
    transformOrigin: 'center',

    transition: createTransition({ property: 'transform', options: { duration: 'fast' } }),

    ':hover': {
        backgroundColor: 'var(--gray-a3)',
    },

    ':active': {
        transform: 'scale(0.98)',
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
});

export const rating = style({
    maxWidth: 96,
});
