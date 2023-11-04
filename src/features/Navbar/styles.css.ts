import { style } from '@vanilla-extract/css';

import { media } from '@src/styles/breakpoints';

export const root = style({
    position: 'sticky',
    top: 0,
    backgroundColor: 'var(--color-page-background)',
    zIndex: 100,
    boxShadow: '0 1px 0 0 var(--gray-a6)',
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
