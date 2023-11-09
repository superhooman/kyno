export const stringifyQuery = (query: Record<string, string | number | undefined>) => {
    return Object.entries(query).filter(([, value]) => value).map(([key, value]) => `${key}=${encodeURIComponent(value!)}`).join('&');
};

export const getTickerUrl = (sessionId: number, cityId: number, intl: string, movieId: number, banner: string, token?: string) => {
    const query = stringifyQuery({
        session: sessionId,
        city_id: cityId,
        intl,
        movieId,
        banner,
        token,
        'event-type': 'movie'
    });

    return `https://ticket.kino.kz/?${query}`;
};
