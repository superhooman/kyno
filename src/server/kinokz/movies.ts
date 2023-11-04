import addDays from 'date-fns/addDays';
import format from 'date-fns/format';

import type { FormattedGenresEntity, FormattedMovieResult, GenresEntity, MovieResult, SearchResult, SearchResultItem } from './types';

import { request } from '.';

const formatDateString = (date: Date) => {
    return format(date, 'yyyy-MM-dd');
};

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
    poster: movie.small_poster.replace('p168x242', 'p344x489'),
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

const formatSearchResultItems = (items: SearchResultItem[]): SearchResultItem[] => items.filter(({ entity }) => entity === 'movie').map((item) => ({
    ...item,
    poster: item.poster.replace('p62x88', 'p168x242'),
}));

export const searchMovies = async (text: string) => {
    const data = await request<SearchResult>('/elasticsearch-api/v2/find', { query: { text } });

    return {
        current: formatSearchResultItems(data.result.active_items),
        past: formatSearchResultItems(data.result.passed_items),
    };
};
