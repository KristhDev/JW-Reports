/**
 * PreachingStackParamsList is a type that is an object with two properties, HomeScreen and
 * AddOrEditPreachingScreen, where both properties are of type undefined.
 * @property HomeScreen - undefined;
 * @property AddOrEditPreachingScreen - undefined;
 */
export type PreachingStackParamsList = {
    HomeScreen: undefined;
    AddOrEditPreachingScreen: undefined;
}

/* Defining the structure of the PreachingState object. */
export interface PreachingState {
    isPreachingDeleting: boolean;
    isPreachingLoading: boolean;
    isPreachingsLoading: boolean;
    preachings: Preaching[];
    selectedDate: Date;
    seletedPreaching: Preaching;
}

/* Defining the structure of the Preaching object. */
export interface Preaching {
    id: string;
    user_id: string;
    day: string;
    init_hour: string;
    final_hour: string;
    publications: number;
    videos: number;
    revisits: number;
    created_at: string;
    updated_at: string;
}

/* Defining the structure of the PreachingFormValues object. */
export interface PreachingFormValues {
    day: Date;
    init_hour: Date;
    final_hour: Date;
    publications: number;
    videos: number;
    revisits: number;
}

/**
 * PreachingPayload is an object with a property called preaching that is of type Preaching
 * @property {Preaching} preaching - Preaching
 */
export type PreachingPayload = {
    preaching: Preaching
}

/**
 * SetSelectedDatePayload is an object with a property called selectedDate that is a Date.
 * @property {Date} selectedDate - Date;
 */
export type SetSelectedDatePayload = {
    selectedDate: Date;
}

/**
 * SetPreachingsPayload is an object with a preachings property that is an array of Preaching objects.
 * @property {Preaching[]} preachings - Preaching[]
 */
export type SetPreachingsPayload = {
    preachings: Preaching[];
}