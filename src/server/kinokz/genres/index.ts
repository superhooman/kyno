import type { FormattedGenresEntity, GenresEntity } from './types';

export const formatGenre = (genre: GenresEntity): FormattedGenresEntity => ({
    id: genre.id,
    title: {
        ru: genre.title,
        en: genre.title_eng,
        kk: genre.title_kz,
    },
});
