import type { TranslatableValue } from '@src/locales/utils';
import type { FormattedGenresEntity, GenresEntity } from '../genres/types';

export interface MovieResult {
    id: number;
    name: string;
    name_rus: string;
    name_origin: string;
    presentation: string;
    rating: number;
    rating_state: boolean;
    age_restriction?: number;
    genre?: string | null;
    genres?: GenresEntity[] | null;
    premiere_kaz: string;
    small_poster: string;
    priority: number;
    session_id: number;
}

export interface FormattedMovieResult {
    id: number;
    name: TranslatableValue;
    presentation: string;
    rating: number;
    ratingState: boolean;
    ageRestriction?: number;
    genre?: string | null;
    genres?: FormattedGenresEntity[] | null;
    premiere: string;
    poster: string;
    priority: number;
    sessionId: number;
}
