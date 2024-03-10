import { style } from '@vanilla-extract/css';

export const dateHeader = style({
    position: 'sticky',
    top: 64,
    zIndex: 99,
    backgroundColor: 'var(--color-page-background)',
    boxShadow: '0 1px 0 0 var(--gray-a6)',
    minWidth: 0,
});
