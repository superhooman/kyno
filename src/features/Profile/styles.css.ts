import { keyframes, style } from '@vanilla-extract/css';

import { easings } from '@src/styles/transitions';
import { media } from '@src/styles/breakpoints';

const skeletonAnimation = keyframes({
    '0%': {
        opacity: 0.2,
    },
    '50%': {
        opacity: 0.8,
    },
    '100%': {
        opacity: 0.2,
    },
});

export const ticketRoot = style({
    position: 'relative',

    selectors: {
        '&[data-refunded="true"]': {
            opacity: 0.7,
        }
    }
});

export const skeleton = style({
    animation: `${skeletonAnimation} 1.5s ${easings.easeInOut} infinite`,
});

export const ticketImageWrap = style({
    position: 'relative',
    paddingTop: '57%',
});

export const ticketImageText = style({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    padding: 'var(--card-padding)',
    paddingBottom: 'var(--space-4)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundImage: 'linear-gradient(to bottom, var(--black-a1), var(--black-a9))',
    selectors: {
        '[data-refunded="true"] &': {
            backdropFilter: 'grayscale(1)',
        }
    }
});

export const ticketImageTextHeader = style({
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    maxHeight: 'calc(var(--line-height) * 2)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: 'var(--white-a12)',
});

export const ticketImageTime = style({
    position: 'absolute',
    top: 'var(--card-padding)',
    left: 'var(--card-padding)',
    zIndex: 1,
});

export const ticketImageHoles = style({
    backgroundSize: '40px 10px',
    height: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundPosition: 'center',
});

export const ticketImageHolesSvg = style({
    display: 'block',
});

export const noWrap = style({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
});

export const flex = style({
    minWidth: 0,
});

export const refunded = style({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(-4deg)',
    padding: 'var(--space-1) var(--space-3)',
    borderRadius: 'var(--radius-2)',
    backgroundColor: 'var(--red-9)',
    color: 'var(--red-9-contrast)',
    zIndex: 1,
    textTransform: 'uppercase',
});

export const qrCard = style({
    maxWidth: 320,
    margin: '0 auto',
});

export const qrLogo = style({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    vars: {
        '--card-padding': 'var(--space-2)',
    }
});

export const logo = style({
    display: 'block',
    color: 'var(--accent-9)',
});

export const mediaContainer = style({
    position: 'relative',
    width: '100%',
    paddingTop: '36%',
    backgroundColor: 'var(--gray-a3)',

    vars: {
        '--card-padding': 'var(--space-3)',
    }
});

export const closeButton = style({
    position: 'absolute',
    top: 'var(--space-2)',
    right: 'var(--space-2)',
    zIndex: 1,

    '@media': {
        [media.down('sm')]: {
            display: 'none',
        }
    }
});

export const ticketCard = style({
    ':after': {
        zIndex: 2,
        pointerEvents: 'none',
    }
});
