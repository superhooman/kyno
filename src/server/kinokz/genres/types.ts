import type { TranslatableValue } from '@src/locales/utils';

export interface GenresEntity {
    id: number;
    title: string;
    title_kz: string;
    title_eng: string;
}

export interface FormattedGenresEntity {
    id: number;
    title: TranslatableValue;
}
