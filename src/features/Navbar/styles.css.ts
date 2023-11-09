import { style } from '@vanilla-extract/css';

import { media } from '@src/styles/breakpoints';
import { createTransition } from '@src/styles/transitions';

export const root = style({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'var(--color-page-background)',
    zIndex: 100,
    boxShadow: '0 1px 0 0 var(--gray-a6)',
    transition: createTransition('transform'),
});

export const placeholder = style({
    height: 64,
    flexShrink: 0,
});

export const name = style({
    letterSpacing: '0.2em',
    textTransform: 'uppercase',

    '@media': {
        [media.down('sm')]: {
            display: 'none',
        }
    }
});

export const searchWrapper = style({
    maxWidth: 320,
    width: '100%',
    minWidth: 0,

    '@media': {
        [media.down('xxs')]: {
            alignItems: 'end',
        }
    }
});

export const hideOnMobile = style({
    '@media': {
        [media.down('sm')]: {
            display: 'none',
        }
    }
});

export const hideOnDesktop = style({
    '@media': {
        [media.up('sm')]: {
            display: 'none',
        }
    }
});
