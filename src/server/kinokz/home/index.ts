import addDays from 'date-fns/addDays';


import type { FormattedGenresEntity, GenresEntity } from '../genres/types';
import type { FormattedMovieResult, MovieResult } from './types';

import { formatDateString } from '@src/utils/date';

import { convertImageUrl } from '../utils/images';
import { request } from '..';

export const formatGenre = (genre: GenresEntity): FormattedGenresEntity => ({
    id: genre.id,
    title: {
        ru: genre.title,
        en: genre.title_eng,
        kk: genre.title_kz,
    },
});

export const formatMovie = (movie: MovieResult): FormattedMovieResult => ({
    id: movie.id,
    name: {
        ru: movie.name,
        en: movie.name_origin,
        kk: movie.name,
    },
    presentation: movie.presentation,
    rating: movie.rating,
    ratingState: movie.rating_state,
    ageRestriction: movie.age_restriction,
    genre: movie.genre,
    genres: movie.genres?.map(formatGenre),
    premiere: movie.premiere_kaz,
    poster: convertImageUrl(movie.small_poster, 'p344x489'),
    priority: movie.priority,
    sessionId: movie.session_id,
});

export const getMovies = async (cityId: number, startDate: Date = new Date()) => {
    const endDate = addDays(startDate, 6);

    const payload = {
        city_id: cityId,
        start_date: formatDateString(startDate),
        end_date: formatDateString(endDate),
    };

    const data = await request<MovieResult[] | undefined, typeof payload>('/sessions/v1/movies/find', {
        payload,
        method: 'POST',
    });

    return data.result?.map(formatMovie);
};

export const getSoonMovies = async () => {
    const data = await request<MovieResult[] | undefined>('/sessions/v1/movies/soon');

    return data.result?.map(formatMovie);
};
