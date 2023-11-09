export const routes = {
    home: {
        path: '/',
        exact: true,
    },
    auth: {
        path: '/auth',
        exact: true,
    },
    profile: {
        path: '/profile',
        exact: true,
    },
    movie: {
        path: '/movie/:id',
        exact: false,
    },
    cinemas: {
        path: '/cinemas',
        exact: true,
    }
} as const;

type Stringifiable = string | number | boolean | null | undefined;

interface Options {
    locale?: string;
    params?: Record<string, Stringifiable>;
    query?: Record<string, string>;
}

export const makeHref = (route: keyof typeof routes, { locale, params, query }: Options = {}): string => {
    const { path } = routes[route];

    let href = path as string;

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            href = href.replace(`:${key}`, String(value));
        });
    }

    if (query) {
        const queryStr = new URLSearchParams(query).toString();

        if (queryStr) {
            href = `${href}?${queryStr}`;
        }
    }

    if (locale) {
        href = `/${locale}${href}`;
    }

    return href;
};
