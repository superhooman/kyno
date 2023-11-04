import type { CinemaResult, FormattedCinemaResult, FormattedFullMovie, FormattedHallResult, FormattedSessionResult, FormattedSessionsResult, FullMovieResult, HallResult, SessionResult, SessionsResult } from './types';

import { formatGenre } from './movies';

import { request } from '.';

const formatMovie = (movie: FullMovieResult): FormattedFullMovie => ({
    id: movie.id,
    name: {
        ru: movie.name_rus,
        en: movie.name_origin,
        kk: movie.name,
    },
    ageRestriction: movie.age_restriction,
    description: movie.presentation,
    isPremiere: movie.is_premier,
    production: movie.production,
    director: movie.director,
    actors: movie.actors.split(', '),
    genres: movie.genres?.map(formatGenre),
    premiereWorld: movie.premiere_world ?? undefined,
    premiereKaz: movie.premiere_kaz ?? undefined,
    kinopoiskId: movie.kinopoisk_id ?? undefined,
    kinopoiskRating: movie.kinopoisk_rating ?? undefined,
    imdbRating: movie.imdb_rating ?? undefined,
    rating: movie.rating,
    ratingState: movie.rating_state,
    posters: movie.posters,
    videoUrl: movie.videos?.[0],
});

export const getMovie = async (id: number, locale: string = 'ru') => {
    const response = await request<FullMovieResult>('/catalog/v1/movie', {
        query: {
            movie_id: id,
        },
        locale,
    });

    return formatMovie(response.result);
};

const formatCinema = (cinema: CinemaResult): FormattedCinemaResult => ({
    id: cinema.id,
    name: cinema.name,
    address: cinema.address,
    latitude: cinema.latitude,
    longitude: cinema.longitude,
    bigPoster: cinema.big_poster,
    smallPoster: cinema.small_poster,
});

const formatHall = (hall: HallResult): FormattedHallResult => ({
    id: hall.id,
    cinemaId: hall.cinema_id,
    name: hall.name_i18n,
    nameParser: hall.name_parser,
    providerId: hall.provider_id,
    laser: hall.laser,
    imax: hall.imax,
});

const formatSession = (session: SessionResult): FormattedSessionResult => ({
    adult: session.adult,
    child: session.child,
    student: session.student,
    vip: session.vip,
    id: session.id,
    hour: session.hour,
    minutes: session.minutes,
    sessionDate: session.session_date_tz,
    langId: session.lang_id,
    sessionId: session.session_id,
    canBuyTickets: session.session_type === 1,
});

export const getSessions = async (date: string, cityId: number, movieId: number, locale: string = 'ru') => {
    const response = await request<SessionsResult>('/sessions/v1/movie/sessions', {
        query: {
            date,
            city_id: cityId,
            movie_id: movieId,
        },
        locale,
    });

    return ({
        availableDates: response.result.available_dates,
        sessions: response.result.sessions?.map((session) => ({
            cinema: formatCinema(session.cinema),
            hall: formatHall(session.hall),
            session: formatSession(session.session),
        })),
    }) as FormattedSessionsResult;
};
