export type PreachingStackParamsList = {
    HomeScreen: undefined;
    AddOrEditPreachingScreen: undefined;
}

export interface PreachingState {
    isPreachingDeleting: boolean;
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

export type PreachingPayload = {
    preaching: Preaching
}

export type SetSelectedDatePayload = {
    selectedDate: Date;
}

export type SetPreachingsPayload = {
    preachings: Preaching[];
}