import type { KinoResponse } from '../types';

export interface AuthResult {
    expires_at_unix: number;
    refresh_expires_at_unix: number;
    refresh_token: string;
    token: string;
};

export interface Profile {
    id: number;
    email: string;
    phone: string;
    first_name: string | null;
    last_name: string | null;
};

export interface ProfileResult {
    profile: Profile;
    token: string;
};

export interface RefreshResult {
    code: number;
    data: AuthResult & { access_token: string };
};

export interface SendOTPResultSuccess extends KinoResponse {
    status: boolean;
    verification_token: string;
};
