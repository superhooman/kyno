import { globalStyle, style } from '@vanilla-extract/css';

import { media } from '@src/styles/breakpoints';

globalStyle('.rt-DialogOverlay', {
    '@media': {
        [media.down('xs')]: {
            padding: 0,
        }
    }
});

export const content = style({
    '@media': {
        [media.down('xs')]: {
            maxHeight: 'unset',
            height: '100dvh',
            borderRadius: 0,
            backgroundColor: 'var(--color-page-background)',
        }
    }
});
