export type Screen = 'initial' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const breakpoints: Record<Screen, number> = {
    'initial': 0,
    'xxs': 368,
    'xs': 520,
    'sm': 768,
    'md': 1024,
    'lg': 1280,
    'xl': 1640,
};

export const media = {
    down: (screen: Screen) => `screen and (max-width: ${breakpoints[screen] - 0.5}px)`,
    up: (screen: Screen) => `screen and (min-width: ${breakpoints[screen]}px)`,
};
