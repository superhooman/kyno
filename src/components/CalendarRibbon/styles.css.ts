import { style } from '@vanilla-extract/css';

export const day = style({
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    height: 'var(--space-8)',
    width: 'var(--space-8)',

    // borderRadius: 'var(--radius-4)',

    // boxShadow: 'inset 0 0 0 1px var(--accent-a8)',
    // color: 'var(--accent-a11)',

    // selectors: {
    //     '[data-selected="true"]&': {
    //         boxShadow: 'unset',
    //         backgroundColor: 'var(--accent-9)',
    //         color: 'var(--accent-9-contrast)',
    //     },
    // }
});

export const scrollable = style({
    overflow: 'auto',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',

    '::-webkit-scrollbar': {
        display: 'none',
    },
});
