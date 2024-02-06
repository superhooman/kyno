import { globalStyle, style } from '@vanilla-extract/css';

import { breakpoints, media } from '@src/styles/breakpoints';

globalStyle('.rt-DialogOverlay', {
    '@media': {
        [media.down('xs')]: {
            padding: 0,
        }
    }
});

export const vaul = style({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    position: 'fixed',
    marginTop: '92px',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1000,

    '::before': {
        content: '""',
        position: 'fixed',
        display: 'block',
        top: 'var(--space-2)',
        height: 'var(--space-2)',
        width: 'var(--space-8)',
        backgroundColor: 'var(--gray-a6)',
        left: 'calc(50% - var(--space-4))',
        borderRadius: 'var(--radius-4)',
        zIndex: 1,
    },

    '::after': {
        backgroundColor: 'var(--color-panel)',
    }
});

export const vaulInner = style({
    borderTopLeftRadius: 'var(--radius-4)',
    borderTopRightRadius: 'var(--radius-4)',
    overflow: 'hidden',
    backgroundColor: 'var(--color-panel-solid)',
    boxShadow: '0 0 0 1px var(--gray-a6)',
});

export const vaulOverlay = style({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'linear-gradient(to bottom, var(--black-a1) 0%, var(--black-a12) 50%)',
    zIndex: 999,
});

export const content = style({
    vars: {
        '--color-panel': 'var(--color-panel-solid)',
    },

    '@media': {
        [media.down('xs')]: {
            maxHeight: 'unset',
            height: '100dvh',
            borderRadius: 0,
        },
        [media.up('xs')]: {
            selectors: {
                ...(Object.entries(breakpoints).reduce((acc, [key, value]) => ({
                    ...acc,
                    [`&[data-width="${key}"]`]: {
                        maxWidth: value,
                    },
                }), {})),
            }
        },
    }
});
