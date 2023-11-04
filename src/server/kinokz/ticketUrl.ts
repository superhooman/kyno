export const stringifyQuery = (query: Record<string, string | number>) => {
    return Object.entries(query).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');
};

export const getTickerUrl = (sessionId: number, cityId: number, intl: string, movieId: number, banner: string) => {
    const query = stringifyQuery({
        session: sessionId,
        city_id: cityId,
        intl,
        movieId,
        banner,
        'event-type': 'movie'
    });

    return `https://ticket.kino.kz/?${query}`;
};
