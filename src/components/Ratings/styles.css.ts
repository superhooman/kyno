import { style } from '@vanilla-extract/css';

import { media } from '@src/styles/breakpoints';

export const separator = style({
    '@media': {
        [media.up('sm')]: {
            opacity: 0,
        }
    }
});
