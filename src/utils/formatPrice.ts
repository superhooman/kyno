import { NA } from '@src/constants/placeholder';

export const formatPrice = (price: number) => {
    if (price === 0) return NA;

    const KZT = '₸';

    return `${price.toLocaleString('ru-RU')} ${KZT}`;
};
