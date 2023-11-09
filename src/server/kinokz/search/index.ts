import type { SearchResult, SearchResultItem } from './types';

import { request } from '..';
import { convertImageUrl } from '../utils/images';

const formatSearchResultItems = (items: SearchResultItem[]): SearchResultItem[] => items.filter(({ entity }) => entity === 'movie').map((item) => ({
    ...item,
    poster: convertImageUrl(item.poster, 'p168x242'),
}));

export const searchMovies = async (text: string) => {
    const data = await request<SearchResult>('/elasticsearch-api/v2/find', { query: { text } });

    return {
        current: formatSearchResultItems(data.result.active_items),
        past: formatSearchResultItems(data.result.passed_items),
    };
};
