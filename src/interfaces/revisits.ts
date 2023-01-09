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
    revisitsPagination: {
        from: number;
        to: number;
    }
    seletedRevisit: Revisit;
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

export type AddRevisitPayload = {
    revisit: Revisit;
}

export type SetHasMoreRevisitsPayload = {
    hasMore: boolean;
}

export type SetIsRevisitsLoading = {
    isLoading: boolean;
}

export type SetIsRevisitLoading = {
    isLoading: boolean;
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
    pagination: {
        to: number;
        from: number;
    }
}

export type SetSelectedRevisitPayload = {
    revisit: Revisit;
}

export type SetIsRevisitDeletingPayload = {
    isDeleting: boolean;
}

export type SetIsRevisitLoadingPayload = {
    isLoading: boolean;
}

export type SetIsRevisitsLoadingPayload = {
    isLoading: boolean;
}

export type RemoveRevisitPayload = {
    id: string;
}

export type UpdateRevisitPayload = {
    revisit: Revisit;
}