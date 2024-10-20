import { RevisitEntity } from '@domain/entities/revisit.entity';
import { Pagination } from '../ui/types';
import { RevisitFilter } from 'src/presentation/modules/revisits';

/**
 * Defining the structure of the RevisitsState object.
 *
 * @property {boolean} hasMoreRevisits - This indicates whether there are more revisits to load.
 * @property {boolean} isLastRevisitLoading - This indicates whether the last revisit is being loaded.
 * @property {boolean} isRevisitDeleting - This indicates whether a revisits is being deleted.
 * @property {boolean} isRevisitLoading - This indicates whether a revisits is being loaded.
 * @property {boolean} isRevisitsLoading - This indicates whether revisits are being loaded.
 * @property {RevisitEntity} lastRevisit - This is the last revisit.
 * @property {boolean} refreshRevisits - This indicates whether the revisits should be refreshed.
 * @property {RevisitFilter} revisitFilter - This is the filter for revisits.
 * @property {RevisitEntity[]} revisits - This is an array of revisits.
 * @property {string[]} revisitsScreenHistory - This is an array of screen history.
 * @property {Pagination} revisitsPagination - This is the pagination for revisits.
 * @property {RevisitEntity} selectedRevisit - This is the selected revisits.
 */
export interface RevisitsState {
    hasMoreRevisits: boolean;
    isLastRevisitLoading: boolean;
    isRevisitDeleting: boolean;
    isRevisitLoading: boolean;
    isRevisitsLoading: boolean;
    lastRevisit: RevisitEntity;
    refreshRevisits: boolean;
    revisitFilter: RevisitFilter;
    revisits: RevisitEntity[];
    revisitsPagination: Pagination;
    revisitsScreenHistory: string[];
    selectedRevisit: RevisitEntity;
}

/**
 * A RevisitPayload is an object with a revisit property that is a RevisitEntity.
 *
 * @property {RevisitEntity} revisit - RevisitEntity;
 */
export type RevisitPayload = {
    revisit: RevisitEntity;
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
 * `SetRevisitsPayload` is an object with a property called `revisits` that is an array of `RevisitEntity`
 * objects.
 *
 * @property {RevisitEntity[]} revisits - RevisitEntity[]
 */
export type SetRevisitsPayload = {
    revisits: RevisitEntity[];
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