export interface PreachingState {
    isPreachingLoading: boolean;
    isPreachingsLoading: boolean;
    preachings: Preaching[];
    selectedDate: Date;
    seletedPreaching: Preaching;
}

export interface Preaching {
    id: string;
    user_id: string;
    day: string;
    init_hour: string;
    final_hour: string;
    posts: number;
    videos: number;
    revisits: number;
    created_at: string;
    updated_at: string;
}

export type AddPreachingPayload = {
    preaching: Preaching
}

export type UpdatePreachingPayload = {
    preaching: Preaching
}

export type SetIsPreachingsLoadingPayload = {
    isLoading: boolean;
}

export type SetIsPreachingLoadingPayload = {
    isLoading: boolean;
}

export type SetSelectedDatePayload = {
    selectedDate: Date;
}

export type SetPreachingsPayload = {
    preachings: Preaching[];
}

export type SetSelectedPreachingPayload = {
    preaching: Preaching;
}