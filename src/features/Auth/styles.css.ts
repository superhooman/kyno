import { style } from '@vanilla-extract/css';

import { breakpoints } from '@src/styles/breakpoints';

export const root = style({
    minHeight: 'calc(100dvh - 64px)',
    padding: 'var(--space-6) var(--space-2)',
    paddingBottom: 'calc(68px + 24px)',
});

export const card = style({
    maxWidth: breakpoints.xxs,
    width: '100%',
});

export const pinInput = style({
    borderRadius: 'var(--radius-3)',
    boxShadow: 'inset 0 0 0 1px var(--gray-a7)',
    fontSize: 'var(--font-size-4)',

    selectors: {
        '&:focus': {
            outline: '2px solid var(--color-focus-root)',
            outlineOffset: -1,
        }
    }
});

