import { style } from '@vanilla-extract/css';

export const root = style({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
});

export const star = style({
    display: 'flex',
    width: '100%',
    flexGrow: 1,
    selectors: {
        '&:not(svg)': {
            padding: '3%',
        },
        '&[data-filled="true"]': {
            fill: 'var(--accent-9)',
        },
        '&[data-filled="false"]': {
            fill: 'var(--accent-a5)',
        },
    }
});

export const stop1 = style({
    stopColor: 'var(--accent-9)',
});

export const stop2 = style({
    stopColor: 'var(--accent-a4)',
});
