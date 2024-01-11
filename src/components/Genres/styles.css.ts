import { style } from '@vanilla-extract/css';

import { skeleton } from '@src/styles/common.css';

export const item = style({
    selectors: {
        '[data-skeleton="true"] &': {
            backgroundColor: 'var(--gray-a3)',
            width: 64,
            ...skeleton,
        },
    }
});
