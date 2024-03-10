import { style } from '@vanilla-extract/css';

import { media } from '@src/styles/breakpoints';
import { createTransition } from '@src/styles/transitions';

export const columnValue = style({
    fontVariantNumeric: 'tabular-nums',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

export const noData = style({
    opacity: 0.5,
});

export const time = style({
    width: 72,
    justifyContent: 'center',
    height: 48,
});

export const timeText = style({
    fontWeight: 700,
    lineHeight: 1.2,
});

export const laser = style({
    lineHeight: 1,
});

export const arrow = style({
    '@media': {
        [media.up('sm')]: {
            display: 'none',
        }
    }
});

export const tableLabels = style({
    position: 'sticky',
    top: 64,
    zIndex: 99,
    backgroundColor: 'var(--color-page-background)',
    boxShadow: '0 1px 0 0 var(--gray-a6)',
    minWidth: 0,
});

export const cinemaName = style({
    position: 'sticky',
    top: 'calc(64px + 44px)',
    zIndex: 98,
    backgroundColor: 'var(--color-page-background)',
    boxShadow: '0 1px 0 0 var(--gray-a6)',
    minWidth: 0,

    '@media': {
        [media.down('sm')]: {
            top: 'calc(64px + 36px)',
        }
    }
});

export const sessionLabel = style({
    '@media': {
        [media.down('sm')]: {
            display: 'none',
        }
    }
});

export const grid = style({
    width: 320,

    '@media': {
        [media.down('sm')]: {
            width: '100%',
        }
    }
});

export const overflow = style({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
});

export const flex = style({
    minWidth: 0,
});

export const item = style({
    minWidth: 0,
    padding: 'var(--space-2)',
    margin: '0 calc(var(--space-2) * -1)',

    transition: createTransition({ property: 'background-color', options: { duration: 'fast' } }),

    borderRadius: 'var(--radius-4)',

    selectors: {
        '&[data-clickable="true"]:hover': {
            backgroundColor: 'var(--gray-a2)',
        },
        '&[data-clickable="true"]:active': {
            backgroundColor: 'var(--gray-a3)',
        },
    }
});

export const inset = style({
    height: 'calc(100vh - 64px)',
    display: 'flex',
    flexDirection: 'column',

    '@media': {
        [media.down('xs')]: {
            height: '100dvh'
        }
    }
});

export const content = style({
    position: 'relative',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export const iframe = style({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 'none',
    zIndex: 1,
});
