import type { TranslatableValue } from '@src/locales/utils';
import type { FormattedMovieResult } from '@src/server/kinokz/home/types';

export const EMPTY_CHARACTER = '‎';

export const EMPTY_POSTER = '/poster.svg';

export const EMPTY_TRANSLATALE_VALUE: TranslatableValue = {
    ru: EMPTY_CHARACTER,
    kk: EMPTY_CHARACTER,
    en: EMPTY_CHARACTER,
};

export const EMPTY_MOVIE: FormattedMovieResult = {
    id: 0,
    name: EMPTY_TRANSLATALE_VALUE,
    presentation: EMPTY_CHARACTER,
    rating: 0.0001,
    ratingState: true,
    premiere: EMPTY_CHARACTER,
    poster: EMPTY_POSTER,
    priority: 0,
    sessionId: 0,
    genres: [{ id: 0, title: EMPTY_TRANSLATALE_VALUE }]
};
