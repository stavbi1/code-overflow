import axios from "axios";

import StackExchange from '../StackExchange';
import { SearchOrder, SearchRequestOptions, SortBy } from "./SearchRequestOptions";
import { Item, SearchResult } from "./SearchResult";

const SEARCH_ROUTE = '/2.3/similar';

const defaultOptions: SearchRequestOptions = {
    page: 1,
    pagesize: 5,
    order: SearchOrder.DESC,
    sort: SortBy.RELEVANCE,
    site: "stackoverflow",
    filter: "!-NHuCSBI(mK9lANRoU-O9)grUAKH9Ze7-"
};

export const search = async (query: string, options: SearchRequestOptions = defaultOptions): Promise<Item[]> => {
    const axiosResult = await axios.get<SearchResult>(`${StackExchange.API_URL}/${SEARCH_ROUTE}`,{
        params: {
            ...defaultOptions,
            ...options,
            title: query
        },
    });

    return axiosResult.data.items;
};