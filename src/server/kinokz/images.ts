import type { Posters } from './types';

export const convertImageUrl = (url: string, variant: keyof Posters) => {
    return url.replace(/\/p\d+x\d+/, `/${variant}`);
};
