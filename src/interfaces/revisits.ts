import { Pagination } from './ui';

export type RevisitsStackParamsList = {
    RevisitsTopTabsNavigation: undefined;
    RevisitDetailScreen: undefined;
    AddOrEditRevisitScreen: undefined;
}

export type RevistsTopTabsParamsList = {
    RevisitsScreen: {
        emptyMessage: string,
        filter: RevisitFilter,
        title: string
    },
    VisitedRevisitsScreen: {
        emptyMessage: string,
        filter: RevisitFilter,
        title: string
    },
    UnvisitedRevisitsScreen: {
        emptyMessage: string,
        filter: RevisitFilter,
        title: string
    }
}

export interface RevisitsState {
    hasMoreRevisits: boolean;
    isRevisitDeleting: boolean;
    isRevisitLoading: boolean;
    isRevisitsLoading: boolean;
    refreshRevisits: boolean;
    revisits: Revisit[];
    revisitsScreenHistory: string[];
    revisitsPagination: Pagination;
    selectedRevisit: Revisit;
}

export interface Revisit {
    id: string;
    user_id: string;
    person_name: string;
    about: string;
    address: string;
    photo?: string;
    next_visit: string;
    done: boolean;
    created_at: string;
    updated_at: string;
}

export type RevisitFilter = 'all' | 'visited' | 'unvisited';

export type RevisitPayload = {
    revisit: Revisit;
}

export type SetHasMoreRevisitsPayload = {
    hasMore: boolean;
}

export type SetRefreshRevisitsPayload = {
    refresh: boolean;
}

export type SetRevisitsPayload = {
    revisits: Revisit[];
}

export type SetRevisitsHistoryPayload = {
    newScreen: string;
}

export type SetRevisitsPaginationPayload = {
    pagination: Pagination;
}