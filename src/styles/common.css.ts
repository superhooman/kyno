import { keyframes } from '@vanilla-extract/css';

export const skeletonAnimation = keyframes({
    '0%': {
        opacity: 0.5
    },
    '100%': {
        opacity: 1
    }
});

export const skeleton = {
    animation: `${skeletonAnimation} 1s ease-in-out infinite alternate`
};
