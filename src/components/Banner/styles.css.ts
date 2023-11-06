import { style } from '@vanilla-extract/css';

import { media } from '@src/styles/breakpoints';

const BLUR_SIZE = 10;

export const wrapper = style({
    position: 'relative',
    overflow: 'hidden',
});

export const background = style({
    filter: `blur(${BLUR_SIZE}px) brightness(0.8)`,

    '@media': {
        [media.down('sm')]: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        },
    }
});

export const backgroundImage = style({
    paddingTop: '56.25%',
    backgroundSize: 'cover',
    margin: -BLUR_SIZE,
    backgroundPosition: 'center',

    '@media': {
        [media.down('sm')]: {
            paddingTop: 'unset',
            height: `calc(100% + ${BLUR_SIZE * 2}px)`,
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
    backgroundImage: 'linear-gradient(to bottom, var(--black-a1), var(--black-a8))',

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

