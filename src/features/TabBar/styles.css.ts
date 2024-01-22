import { style } from '@vanilla-extract/css';

import { createTransition } from '@src/styles/transitions';
import { media } from '@src/styles/breakpoints';

export const root = style({
    position: 'fixed',
    bottom: 'var(--space-5)',
    left: '50%',
    zIndex: 100,
    padding: 'var(--space-3) var(--space-6)',
    backgroundColor: 'var(--gray-a2)',
    boxShadow: '0 0 0 1px var(--gray-a6)',
    borderRadius: 'var(--radius-full)',
    backdropFilter: 'blur(8px) brightness(0.3)',
    transition: createTransition(['opacity', 'transform']),
    overflow: 'hidden',
    transform: 'translateX(-50%)',

    '@media': {
        [media.up('sm')]: {
            display: 'none',
        }
    },

    selectors: {
        '.light &': {
            backgroundColor: 'var(--color-page-background)',
            backdropFilter: 'none',
        },
        '&[data-hidden="true"]': {
            opacity: 0,
            transform: 'translateY(100%) translateX(-50%)',
        }
    }
});

export const link = style({
    transition: createTransition('color'),
    flexShrink: 0,
    whiteSpace: 'nowrap',
    padding: '0 var(--space-2)',
    WebkitTapHighlightColor: 'transparent',

    selectors: {
        '&[data-matched="true"]': {
            color: 'var(--accent-9)',
        },
        '.light &[data-matched="true"]': {
            color: 'var(--accent-11)',
        }
    }
});
