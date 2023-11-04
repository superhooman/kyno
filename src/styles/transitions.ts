import type { StandardPropertiesHyphen } from 'csstype';

export type Duration = 'fast' | 'normal' | 'slow';

export const durations: Record<Duration, number> = {
    'fast': 150,
    'normal': 250,
    'slow': 350,
};

export type Easing = 'easeInOut' | 'easeOut' | 'sharp';

export const easings: Record<Easing, string> = {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
};

interface TransitionOptions {
    duration?: Duration;
    easing?: Easing;
}

type Property = keyof StandardPropertiesHyphen<number | string>;

type FulTransition = { property: Property, options?: TransitionOptions };

type Transition = Property | FulTransition;

export const createTransition = (transitionOrTransitions: Transition | Transition[]) => {
    const items = Array.isArray(transitionOrTransitions) ? transitionOrTransitions : [transitionOrTransitions];

    return items.map(items => {
        if (typeof items === 'string') {
            return `${items} ${durations.normal}ms ${easings.easeInOut}`;
        }

        const { property, options } = items;

        return `${property} ${durations[options?.duration ?? 'normal']}ms ${easings[options?.easing ?? 'easeInOut']}`;
    }).join(', ');
};
