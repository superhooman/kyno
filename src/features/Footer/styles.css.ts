import { style } from '@vanilla-extract/css';

import { media } from '@src/styles/breakpoints';

export const footer = style({
    backgroundImage: 'linear-gradient(to bottom, var(--color-panel-solid), var(--color-page-background))',

    '@media': {
        [media.down('sm')]: {
            paddingBottom: 'var(--space-9)',
        }
    }
});

export const name = style({
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
});
