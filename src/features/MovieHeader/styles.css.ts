import { style } from '@vanilla-extract/css';

import { media } from '@src/styles/breakpoints';
import { createTransition } from '@src/styles/transitions';

export const inset = style({
    boxShadow: '0 0 0 1px var(--gray-a6)',
    borderRadius: 'var(--radius-5)',
    overflow: 'hidden',

    '@media': {
        [media.down('sm')]: {
            borderRadius: 0,
        }
    }
});

export const infoContainer = style({
    maxWidth: 480,

    '@media': {
        [media.down('sm')]: {
            maxWidth: 'unset',
        }
    }
});

export const mediaWrapper = style({
    position: 'relative',
    width: '100%',
});

export const mediaContent = style({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export const play = style({
    padding: 'var(--space-4)',
    borderRadius: '50%',
    backgroundColor: 'var(--accent-a5)',
    color: 'var(--accent-a12)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(5px)',
    boxShadow: '0 0 0 1px var(--gray-a6)',
    transition: createTransition({ property: 'transform', options: { duration: 'fast' } }),

    cursor: 'pointer',

    ':hover': {
        transform: 'scale(1.1)',
    }
});

export const mediaContainer = style({
    width: '100%',
    paddingTop: '50%',
    backgroundColor: 'var(--gray-a3)',

    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',

    '@media': {
        [media.down('sm')]: {
            paddingTop: '56.25%',
        }
    }
});

