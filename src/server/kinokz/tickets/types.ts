import type { GenresEntity } from '../genres/types';

export interface Ticket {
    id: number;
    amount: number;
    bonusesSpent?: null;
    date: string;
    session_id: string;
    session_lang?: null;
    reservation_id: string;
    reservation_number: string;
    tickets?: (TicketsEntity)[] | null;
    created_at: string;
    updated_at: string;
    paid: boolean;
    canceled: boolean;
    refunded: boolean;
    booking_time?: null;
    invoiceId: string;
    postLink: string;
    failurePostLink: string;
    platform: string;
    version: string;
    refund_amount: number;
    refunded_at?: null;
    requester: number;
    cdm_post: boolean;
    cdm_put: boolean;
    multiple_qr: boolean;
    shared: boolean;
    is_kino_card: boolean;
}

export interface TicketsEntity {
    id: number;
    theatre: string;
    theatre_address: string;
    movie_name: string;
    movie_format: string;
    theatre_id: number;
    hall: number;
    hall_name: string;
    level: number;
    row: number;
    place: number;
    invoice_id: number;
    movie_id: number;
    cinema_id: number;
    age_restriction: string;
    poster: string;
    rating: number;
    cinema_latitude: number;
    cinema_longitude: number;
    genre?: string | null;
    genres?: GenresEntity[] | null;
    created_at: string;
    updated_at: string;
    price: number;
    access_code?: null;
    placement: string;
    qr_code: string;
}
