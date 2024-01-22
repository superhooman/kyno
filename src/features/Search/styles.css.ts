import { keyframes, style } from '@vanilla-extract/css';

import { media } from '@src/styles/breakpoints';
import { durations, easings } from '@src/styles/transitions';

export const flex = style({
    minWidth: 0,
});

export const overflow = style({
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
});

export const poster = style({
    backgroundColor: 'var(--gray-a3)',
    borderRadius: 'var(--radius-3)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    flexShrink: 0,
});

export const scrollArea = style({
    flexGrow: 1,
    '@media': {
        [media.up('xs')]: {
            maxHeight: 'calc(100vh - 120px)',
        }
    }
});

export const itemRoot = style({
    minWidth: 0,
    padding: 'var(--space-2)',
    margin: 'calc(-1 * var(--space-2))',
    cursor: 'pointer',
    borderRadius: 'var(--radius-3)',

    ':hover': {
        backgroundColor: 'var(--gray-a3)',
    },

    ':active': {
        transform: 'scale(0.98)',
    }
});

const triggerIntro = keyframes({
    from: {
        opacity: 0,
    },
    to: {
        opacity: 1,
    }
});

export const trigger = style({
    animation: `${triggerIntro} ${durations.normal}ms ${easings.easeOut}`,
    '@media': {
        [media.down('xxs')]: {
            width: 'fit-content',
            backgroundColor: 'transparent',
            paddingLeft: 'var(--space-2)',
            paddingRight: 'var(--space-2)',
        }
    }
});


export const triggerText = style({
    '@media': {
        [media.down('xxs')]: {
            display: 'none',
        }
    }
});

