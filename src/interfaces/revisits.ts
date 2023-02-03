import { Image } from 'react-native-image-crop-picker';

/* Interfaces */
import { LoadResourcesOptions, Pagination } from './ui';

/**
 * RevisitsStackParamsList is a type that is an object with three properties, each of which is a
 * screens that takes no parameters and returns undefined.
 * @property RevisitsTopTabsNavigation - This is the top level tab navigator.
 * @property RevisitDetailScreen - undefined;
 * @property AddOrEditRevisitScreen - undefined;
 */
export type RevisitsStackParamsList = {
    RevisitsTopTabsNavigation: undefined;
    RevisitDetailScreen: undefined;
    AddOrEditRevisitScreen: undefined;
}

/**
 * RevistsTopTabsParamsList is a type that has three properties, each of which is an object with three
 * properties.
 * @property RevisitsScreen - {
 * @property VisitedRevisitsScreen - {
 * @property UnvisitedRevisitsScreen - {
 */
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

/* Defining the structure of the RevisitsState object. */
export interface RevisitsState {
    hasMoreRevisits: boolean;
    isRevisitDeleting: boolean;
    isRevisitLoading: boolean;
    isRevisitsLoading: boolean;
    refreshRevisits: boolean;
    revisitFilter: RevisitFilter;
    revisits: Revisit[];
    revisitsScreenHistory: string[];
    revisitsPagination: Pagination;
    selectedRevisit: Revisit;
}

/* Defining the structure of the Revisit object. */
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

/* Defining the structure of the RevisitFormValues object. */
export interface RevisitFormValues {
    person_name: string;
    about: string;
    address: string;
    next_visit: Date;
}

/* Defining the structure of the SaveRevisitOptions object. */
export interface SaveRevisitOptions {
    back?: boolean;
    image?: Image;
    onFinish?: () => void;
    revisitValues: RevisitFormValues;
}

/* Extending the LoadResourcesOptions interface. */
export interface loadRevisitsOptions extends LoadResourcesOptions {
    filter: RevisitFilter;
}

export type RevisitFilter = 'all' | 'visited' | 'unvisited';

/**
 * A RevisitPayload is an object with a revisit property that is a Revisit.
 * @property {Revisit} revisit - Revisit;
 */
export type RevisitPayload = {
    revisit: Revisit;
}

/**
 * `SetHasMoreRevisitsPayload` is an object with a single property `hasMore` of type `boolean`.
 * @property {boolean} hasMore - boolean;
 */
export type SetHasMoreRevisitsPayload = {
    hasMore: boolean;
}

/**
 * `SetRefreshRevisitsPayload` is an object with a property `refresh` of type `boolean`.
 * @property {boolean} refresh - boolean;
 */
export type SetRefreshRevisitsPayload = {
    refresh: boolean;
}

/**
 * `SetRevisitsPayload` is an object with a property called `revisits` that is an array of `Revisit`
 * objects.
 * @property {Revisit[]} revisits - Revisit[]
 */
export type SetRevisitsPayload = {
    revisits: Revisit[];
}

/**
 * `SetRevisitsHistoryPayload` is an object with a property called `newScreen` that is a string.
 * @property {string} newScreen - The name of the screen that the user is currently on.
 */
export type SetRevisitsHistoryPayload = {
    newScreen: string;
}

/**
 * SetRevisitsPaginationPayload is a type that has a property called pagination that is of type
 * Pagination.
 * @property {Pagination} pagination - Pagination;
 */
export type SetRevisitsPaginationPayload = {
    pagination: Pagination;
}