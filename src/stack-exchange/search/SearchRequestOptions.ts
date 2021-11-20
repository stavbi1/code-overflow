export enum SearchOrder {
    DESC = 'desc',
    ASC = 'asc'
}

export enum SortBy {
    ACTIVITY = 'activity',
    VOTES = 'votes',
    CREATION = 'creation',
    RELEVANCE = 'relevance'
}

export interface SearchRequestOptions {
    page?: number;
    pagesize?: number;
    order?: SearchOrder;
    sort?: SortBy;
    site?: string;
    filter?: string;
}