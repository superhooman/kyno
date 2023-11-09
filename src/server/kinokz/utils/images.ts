import type { Posters } from '../posters/types';

export const convertImageUrl = (url: string, variant: keyof Posters) => {
    return url.replace(/\/p\d+x\d+/, `/${variant}`);
};
