export interface RevisitsState {
    isRevisitDeleting: boolean;
    isRevisitLoading: boolean;
    isRevisitsLoading: boolean;
    revisits: Revisit[];
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

export type AddRevisitPayload = {
    revisit: Revisit;
}

export type SetIsRevisitsLoading = {
    isLoading: boolean;
}

export type SetIsRevisitLoading = {
    isLoading: boolean;
}

export type SetRevisitsPayload = {
    revisits: Revisit[];
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
