import { keyframes, style } from '@vanilla-extract/css';

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

export const otpContainer = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
});

export const pinInput = style({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'var(--radius-3)',
    boxShadow: 'inset 0 0 0 1px var(--gray-a7)',
    fontSize: 'var(--font-size-4)',
    width: 'var(--space-7)',
    height: 'var(--space-8)',

    selectors: {
        '&[data-active="true"]': {
            outline: '2px solid var(--color-focus-root)',
            outlineOffset: -1,
        }
    }
});

const caretBlink = keyframes({
    '0%,70%,100%': {
        opacity: 1,
    },
    '20%,50%': {
        opacity: 0,
    }
});

export const caretWrapper = style({
    position: 'absolute',
    pointerEvents: 'none',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animationName: caretBlink,
    animationDuration: '1.2s',
    animationIterationCount: 'infinite',
});

export const caret = style({
    width: '2px',
    height: 'var(--space-5)',
    background: 'var(--color-focus-root)',
});
