'use server';

import { searchMovies } from '@src/server/kinokz/movies';

export const search = async (text: string) => {
    const results = await searchMovies(text);

    return results;
};
