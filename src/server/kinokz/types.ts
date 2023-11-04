import type { TranslatableValue } from '@src/locales/utils';

interface KinoResponse {
    status: boolean;
    message: string;
}

export interface SuccessResponse<T> extends KinoResponse {
    status: true;
    result: T;
}

export interface ErrorResponse extends KinoResponse {
    status: false;
}

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
    genres?: (GenresEntity)[] | null;
    premiere_kaz: string;
    small_poster: string;
    priority: number;
    session_id: number;
}

export interface GenresEntity {
    id: number;
    title: string;
    title_kz: string;
    title_eng: string;
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

export interface FormattedGenresEntity {
    id: number;
    title: TranslatableValue;
}

type Entity = 'movie' | 'theatre-event' | 'concert-event';

export interface SearchResultItem {
    date: string;
    entity: Entity;
    genre: string;
    poster: string;
    id: number;
    title: string;
    rating: number;
}

export interface SearchResult {
    active_items: SearchResultItem[];
    passed_items: SearchResultItem[];
}

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
    genres?: (GenresEntity)[] | null;
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

export interface Posters {
    p1000x1100: string;
    p258x372: string;
    p1200x1730: string;
    p1192x597: string;
    p168x242: string;
    p80x116: string;
    p120x172: string;
    p164x236: string;
    p62x88: string;
    p344x489: string;
    p181x91: string;
    p768x385: string;
    p150x75: string;
    p599x300: string;
    p279x157: string;
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

export type AvailableDates = string[];

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

export interface SessionsResult {
    available_dates: AvailableDates;
    sessions?: SessionItemResult[];
}

export interface FormattedSessionsResult {
    availableDates: AvailableDates;
    sessions?: FormattedSessionItemResult[];
}
