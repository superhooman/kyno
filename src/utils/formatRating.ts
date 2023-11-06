import { NA } from '@src/constants/placeholder';

export const formatRating = (rating: number) => {
    if (rating === 0) return NA;
    if (rating === 10) return '10';
    return rating.toFixed(1);
};
