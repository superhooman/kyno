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
