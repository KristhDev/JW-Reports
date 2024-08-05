import { Image } from 'react-native-image-crop-picker';

/* Interfaces */
import { LoadResourcesOptions, Pagination } from '../../ui/';

/**
 * RevisitsStackParamsList is a type that is an object with three properties, each of which is a
 * screens that takes no parameters and returns undefined.
 *
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
 * RevisitsTopTabsParamsList is a type that has three properties, each of which is an object with three
 * properties.
 *
 * @property RevisitsScreen - {
 * @property VisitedRevisitsScreen - {
 * @property UnvisitedRevisitsScreen - {
 */
export type RevisitsTopTabsParamsList = {
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

/**
 * Defining the structure of the RevisitsState object.
 *
 * @property {boolean} hasMoreRevisits - This indicates whether there are more revisits to load.
 * @property {boolean} isLastRevisitLoading - This indicates whether the last revisit is being loaded.
 * @property {boolean} isRevisitDeleting - This indicates whether a revisits is being deleted.
 * @property {boolean} isRevisitLoading - This indicates whether a revisits is being loaded.
 * @property {boolean} isRevisitsLoading - This indicates whether revisits are being loaded.
 * @property {Revisit} lastRevisit - This is the last revisit.
 * @property {boolean} refreshRevisits - This indicates whether the revisits should be refreshed.
 * @property {RevisitFilter} revisitFilter - This is the filter for revisits.
 * @property {Revisit[]} revisits - This is an array of revisits.
 * @property {string[]} revisitsScreenHistory - This is an array of screen history.
 * @property {Pagination} revisitsPagination - This is the pagination for revisits.
 * @property {Revisit} selectedRevisit - This is the selected revisits.
 */
export interface RevisitsState {
    hasMoreRevisits: boolean;
    isLastRevisitLoading: boolean;
    isRevisitDeleting: boolean;
    isRevisitLoading: boolean;
    isRevisitsLoading: boolean;
    lastRevisit: Revisit;
    refreshRevisits: boolean;
    revisitFilter: RevisitFilter;
    revisits: Revisit[];
    revisitsPagination: Pagination;
    revisitsScreenHistory: string[];
    selectedRevisit: Revisit;
}

/**
 * Defining the structure of the Revisit Endpoint object.
 *
 * @property {string} id - This is the id of the revisit.
 * @property {string} userId - This is the id of the user.
 * @property {string} personName - This is the name of the person.
 * @property {string} about - This is the about of the person.
 * @property {string} address - This is the address of the person.
 * @property {string | undefined} photo - This is the photo to more information.
 * @property {string} nextVisit - This is the next visit of the person.
 * @property {boolean} done - This indicates whether the revisit is done.
 * @property {string} createdAt - This is the created at of the revisit.
 * @property {string} updatedAt - This is the updated at of the revisit.
 */
export interface Revisit {
    id: string;
    userId: string;
    personName: string;
    about: string;
    address: string;
    photo?: string;
    nextVisit: string;
    done: boolean;
    createdAt: string;
    updatedAt: string;
}

/**
 * Defining the structure of the Revisit Endpoint object.
 *
 * @property {string} id - This is the id of the revisit.
 * @property {string} user_id - This is the id of the user.
 * @property {string} person_name - This is the name of the person.
 * @property {string} about - This is the about of the person.
 * @property {string} address - This is the address of the person.
 * @property {string | undefined} photo - This is the photo to more information.
 * @property {string} next_visit - This is the next visit of the person.
 * @property {boolean} done - This indicates whether the revisit is done.
 * @property {string} created_at - This is the created at of the revisit.
 * @property {string} updated_at - This is the updated at of the revisit.
 */
export interface RevisitEndpoint {
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

/**
 * Defining the structure of the RevisitFormValues object.
 *
 * @property {string} personName - This is the name of the person.
 * @property {string} about - This is the about of the person.
 * @property {string} address - This is the address of the person.
 * @property {Date} nextVisit - This is the next visit of the person.
 */
export interface RevisitFormValues {
    personName: string;
    about: string;
    address: string;
    nextVisit: Date;
}

/**
 * Defining the structure of the SaveRevisitOptions object.
 *
 * @property {boolean | undefined} back - This is the back of the revisit.
 * @property {Image | undefined} image - This is the image of the revisit.
 * @property {() => void | undefined} onFinish - This is the finish of the revisit.
 * @property {RevisitFormValues} revisitValues - This is the revisit values to save.
 */
export interface SaveRevisitOptions {
    back?: boolean;
    image: Image | null;
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
 *
 * @property {Revisit} revisit - Revisit;
 */
export type RevisitPayload = {
    revisit: Revisit;
}

/**
 * `SetHasMoreRevisitsPayload` is an object with a single property `hasMore` of type `boolean`.
 *
 * @property {boolean} hasMore - boolean;
 */
export type SetHasMoreRevisitsPayload = {
    hasMore: boolean;
}

/**
 * `SetRefreshRevisitsPayload` is an object with a property `refresh` of type `boolean`.
 *
 * @property {boolean} refresh - boolean;
 */
export type SetRefreshRevisitsPayload = {
    refresh: boolean;
}

/**
 * `SetRevisitsPayload` is an object with a property called `revisits` that is an array of `Revisit`
 * objects.
 *
 * @property {Revisit[]} revisits - Revisit[]
 */
export type SetRevisitsPayload = {
    revisits: Revisit[];
}

/**
 * `SetRevisitsHistoryPayload` is an object with a property called `newScreen` that is a string.
 *
 * @property {string} newScreen - The name of the screen that the user is currently on.
 */
export type SetRevisitsHistoryPayload = {
    newScreen: string;
}

/**
 * SetRevisitsPaginationPayload is a type that has a property called pagination that is of type
 * Pagination.
 *
 * @property {Pagination} pagination - Pagination;
 */
export type SetRevisitsPaginationPayload = {
    pagination: Pagination;
}