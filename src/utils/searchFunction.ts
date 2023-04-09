import Fuse from "fuse.js";

export function doSearch(list: Array<any>, query: string, options: SearchOption) {
    const fuse = new Fuse(list, options);
    return fuse.search(query)
}

export interface SearchOption {
    isCaseSensitive?: boolean;
    includeScore?: boolean;
    shouldSort?: boolean;
    includeMatches?: boolean;
    findAllMatches?: boolean;
    minMatchCharLength?: number;
    location?: number;
    threshold?: number;
    distance?: number;
    useExtendedSearch?: boolean;
    ignoreLocation?: boolean;
    ignoreFieldNorm?: boolean;
    fieldNormWeight?: number;
    keys: string[];
}
