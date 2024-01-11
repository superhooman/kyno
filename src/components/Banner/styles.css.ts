import { style } from '@vanilla-extract/css';

import { media } from '@src/styles/breakpoints';
import { skeleton } from '@src/styles/common.css';

export const wrapper = style({
    position: 'relative',
    overflow: 'hidden',
});

export const background = style({
    paddingTop: '50%',

    '@media': {
        [media.down('sm')]: {
            paddingTop: 'unset',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        },
    }
});

export const content = style({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    color: 'var(--gray-9-contrast)',

    '@media': {
        [media.down('sm')]: {
            height: 'unset',
            position: 'relative',
            zIndex: 1,
        },
    }
});

export const posterWrapper = style({
    maxWidth: 180,
    width: '100%',
    boxShadow: '0 0 0 1px var(--white-a6)',
    borderRadius: 'var(--radius-3)',
    overflow: 'hidden',

    '@media': {
        [media.down('md')]: {
            maxWidth: 140,
        },
        [media.down('sm')]: {
            width: 120,
            flexShrink: 0,
        },
    },

    selectors: {
        '[data-skeleton=\'true\'] &': {
            boxShadow: 'none',
            ...skeleton,
        },
    }
});

export const poster = style({
    width: '100%',
    paddingTop: '144%',
    backgroundColor: 'var(--gray-a3)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
});

export const rating = style({
    maxWidth: 180,

    '@media': {
        [media.down('md')]: {
            maxWidth: 140,
        },
        [media.down('sm')]: {
            maxWidth: 100,
        },
    }
});

export const title = style({
    selectors: {
        '[data-skeleton=\'true\'] &': {
            backgroundColor: 'var(--gray-a3)',
            borderRadius: 'var(--radius-1)',
            width: 128,
            ...skeleton,
        },
    }
});
