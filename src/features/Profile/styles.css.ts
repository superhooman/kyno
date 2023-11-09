import { keyframes, style } from '@vanilla-extract/css';

import { media } from '@src/styles/breakpoints';
import { createTransition } from '@src/styles/transitions';

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

export const ticket = style({
    // maxHeight: 256,
    position: 'relative',
    width: '100%',
    vars: {
        '--t-height': '182px',
        '--t-padding': 'var(--space-4)',
        '--t-bg': 'var(--gray-4)',
    },

    overflow: 'visible',

    height: 'var(--t-height)',

    paddingLeft: 'var(--t-padding)',
    paddingRight: 'var(--t-padding)',

    '::before': {
        left: 0,
        clipPath: 'path("M12 .2A12 12 0 0 1 0 12.3v12.2a12 12 0 0 1 12 12.2A12 12 0 0 1 0 48.9V61a12 12 0 0 1 12 12.2A12 12 0 0 1 0 85.4v12.2a12 12 0 0 1 12 12.1A12 12 0 0 1 0 122v12.2a12 12 0 0 1 12 12.2 12 12 0 0 1-12 12.1v12.2a12 12 0 0 1 12 12.2A12 12 0 0 1 0 195V207a12 12 0 0 1 12 12.2 12 12 0 0 1-12 12.2v12.2A12 12 0 0 1 12 256h4V0h-4v.2Z")'
    },

    '::after': {
        right: 0,
        clipPath: 'path("M4 255.8a12 12 0 0 1 12-12.1v-12.2a12 12 0 0 1-12-12.2 12 12 0 0 1 12-12.2V195a12 12 0 0 1-12-12.2 12 12 0 0 1 12-12.2v-12.2a12 12 0 0 1-12-12.1A12 12 0 0 1 16 134v-12.2a12 12 0 0 1-12-12.2 12 12 0 0 1 12-12.1V85.4A12 12 0 0 1 4 73.2 12 12 0 0 1 16 61V49A12 12 0 0 1 4 36.7a12 12 0 0 1 12-12.2V12.3A12 12 0 0 1 4 0H0v256h4v-.2Z")',
    },

    ':active': {
        WebkitTapHighlightColor: 'transparent',
    },

    selectors: {
        '&:not([data-fake="true"])': {
            zIndex: 1,
        },
        '&[data-skeleton="true"]': {
            opacity: 0.2,
            animation: `${skeletonAnimation} 1.5s ease-in-out infinite`,
        },
        '&[data-fake="true"]': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
        },
        '&::before, &::after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            zIndex: 1,
            height: '100%',
            width: 'var(--t-padding)',
            backgroundColor: 'var(--t-bg)'
        },
        '.light &': {
            vars: {
                '--t-bg': 'var(--gray-3)',
            }
        },
        '.light &[data-fake="true"]': {
            vars: {
                '--t-bg': 'var(--gray-4)',
            }
        },
        '.dark &[data-fake="true"]': {
            vars: {
                '--t-bg': 'var(--gray-3)',
            }
        }
    },

    '@media': {
        [media.down('sm')]: {
            vars: {
                '--t-height': '148px',
            },
            ':active': {
                opacity: 0.7,
            }
        },
        [media.up('sm')]: {
            transition: createTransition('transform'),
            selectors: {
                '&:not([data-fake="true"]):not([data-skeleton="true"]):hover': {
                    transform: 'scale(1.02)',
                },
                '[data-refunded="true"] &:not([data-fake="true"]):not([data-skeleton="true"]):hover': {
                    transform: 'none',
                },
            }
        }
    }
});

export const noDecoration = style({
    vars: {
        '--t-height': '182px',
        '--t-padding': 'var(--space-4)',
        '--t-bg': 'var(--gray-4)',
    },

    height: 'var(--t-height)',
});

export const content = style({
    position: 'relative',
    height: '100%',
    width: '100%',
    padding: 'var(--t-padding)',
    backgroundColor: 'var(--t-bg)',

    borderWidth: 2,
    borderStyle: 'dotted',
    borderColor: 'var(--color-page-background)',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    backgroundImage: 'url(/pattern_dark.svg)',
    backgroundPosition: 'center',

    backgroundSize: 'var(--space-9)',

    '@media': {
        [media.down('sm')]: {
            padding: 'var(--t-padding) calc(var(--t-padding) / 2)',
        },
    },

    selectors: {
        '.light &': {
            backgroundImage: 'url(/pattern_light.svg)',
            boxShadow: 'none',
        },
        '[data-skeleton="true"] &': {
            backgroundImage: 'none',
            borderColor: 'transparent',
        },
        '[data-no-decoration="true"] &': {
            backgroundImage: 'none',
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            padding: 0,
        }
    }
});


export const time = style({
    position: 'absolute',
    top: 'var(--t-padding)',
    right: 'var(--t-padding)',

    '@media': {
        [media.down('sm')]: {
            top: 'calc(var(--t-padding) / 2)',
            right: 'calc(var(--t-padding) / 2)'
        }
    }
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
    borderRadius: 'var(--radius-full)',
    backgroundColor: 'var(--red-9)',
    color: 'var(--red-9-contrast)',
    zIndex: 1,
    textTransform: 'uppercase',
});

export const poster = style({
    position: 'relative',
    height: '100%',
    width: 'calc(var(--t-height) * 0.58)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundColor: 'var(--gray-a5)',
    borderRadius: 'var(--radius-3)',
    boxShadow: '0 0 0 1px var(--gray-a6)',
    flexShrink: 0,

    '@media': {
        [media.down('sm')]: {
            borderRadius: 'var(--radius-2)',
        },
    },

    selectors: {
        '[data-no-decoration="true"] &': {
            width: 'calc(var(--t-height) * 0.68)',
        }
    }
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
});

export const logo = style({
    display: 'block',
    color: 'var(--accent-9)',
});

export const mediaContainer = style({
    width: '100%',
    paddingTop: '50%',
    backgroundColor: 'var(--gray-a3)',

    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',

    '@media': {
        [media.down('sm')]: {
            paddingTop: '45%',
        }
    }
});
