import type { TranslatableValue } from '@src/locales/utils';
import type { FormattedGenresEntity, GenresEntity } from '../genres/types';
import type { Posters } from '../posters/types';

export interface FullMovieResult {
    local_id: number;
    id: number;
    name: string;
    name_rus: string;
    name_origin: string;
    movie_name_add: string;
    presentation: string;
    description: string;
    production: string;
    director: string;
    actors: string;
    duration: string;
    genre: string;
    genres?: GenresEntity[] | null;
    dub_actors: string;
    age_restriction: number;
    child: boolean;
    awards: string;
    links: string;
    official_site?: null;
    movie_note: string;
    movie_note_url: string;
    movie_club: boolean;
    movie_club_heading: string;
    movie_child_club: boolean;
    imax_name_1: string;
    imax_name_2: string;
    movie_child_club_heading: string;
    movie_theme: string;
    movie_add_date: string;
    movie_distributor_id: number;
    premiere_world?: null;
    premiere_rus?: null;
    premiere_kaz: string;
    premiere_kyr?: null;
    movie_premiere_club?: null;
    movie_premiere_child_club?: null;
    movie_notice_disable: boolean;
    kinopoisk_id?: string;
    kinopoisk_rating?: null;
    kinopoisk_votes?: number;
    imdb_rating?: null;
    imdb_votes?: number;
    movie_youtube: string;
    rating: number;
    rating_state: boolean;
    movie_priority: number;
    movie_type: boolean;
    created_at: string;
    votes: number;
    premiere_rus_my: boolean;
    premiere_kaz_my: boolean;
    premiere_kyr_my: boolean;
    premiere_world_my: boolean;
    want_to_see: boolean;
    favorite_movie: boolean;
    is_rated: boolean;
    rate: number;
    is_reviewed: boolean;
    imax: boolean;
    fdx: boolean;
    is_premier: boolean;
    posters: Posters;
    videos?: (string)[] | null;
    reviews_count: number;
}

export interface FormattedFullMovie {
    id: number;
    name: TranslatableValue;
    description: string;
    production: string;
    director: string;
    actors: string[];
    genres?: FormattedGenresEntity[];
    ageRestriction?: number;
    premiereWorld?: string;
    premiereKaz?: string;
    kinopoiskId?: string;
    kinopoiskRating?: string;
    imdbRating?: string;
    rating: number;
    ratingState: boolean;
    posters: Posters;
    isPremiere: boolean;
    videoUrl?: string;
};


export interface CinemaResult {
    address: string;
    big_poster: string;
    id: number;
    latitude: number;
    longitude: number;
    name: string;
    small_poster: string;
}

export interface FormattedCinemaResult {
    address: string;
    bigPoster: string;
    id: number;
    latitude: number;
    longitude: number;
    name: string;
    smallPoster: string;
}

export interface HallResult {
    cinema_id: number;
    id: number;
    laser: boolean;
    imax: boolean;
    name: string;
    name_i18n: TranslatableValue;
    name_parser: string;
    provider_id: number;
}

export interface FormattedHallResult {
    cinemaId: number;
    id: number;
    laser: boolean;
    imax: boolean;
    name: TranslatableValue;
    nameParser: string;
    providerId: number;
}

export interface SessionResult {
    adult: number;
    child: number;
    student: number;
    vip: number;
    id: number;
    hour: string;
    minutes: string;
    session_date_tz: string;
    lang_id: number;
    session_id: number;
    session_type: number;
}

export interface FormattedSessionResult {
    adult: number;
    child: number;
    student: number;
    vip: number;
    id: number;
    hour: string;
    minutes: string;
    sessionDate: string;
    langId: number;
    sessionId: number;
    canBuyTickets: boolean;
}

export interface SessionItemResult {
    cinema: CinemaResult;
    hall: HallResult;
    session: SessionResult;
}

export interface FormattedSessionItemResult {
    cinema: FormattedCinemaResult;
    hall: FormattedHallResult;
    session: FormattedSessionResult;
}

export type AvailableDates = string[];

export interface SessionListResult {
    available_dates: AvailableDates;
    sessions?: SessionItemResult[];
}

export interface FormattedSessionListResult {
    availableDates: AvailableDates;
    sessions?: FormattedSessionItemResult[];
}
