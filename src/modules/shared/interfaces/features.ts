import { Pagination } from '../../ui/interfaces/ui';

/**
 * Payload for setting the loading state.
 *
 * @property {boolean} isLoading - Whether the state is loading
 */
export type SetIsLoadingPayload = {
    isLoading: boolean;
}

/**
 * Payload for setting the deleting state.
 *
 * @property {boolean} isDeleting - Whether the state is deleting
 */
export type SetIsDeletingPayload = {
    isDeleting: boolean;
}

/**
 * Payload for removing a resource.
 *
 * @property {string} id - The id of the resource
 */
export type RemoveResourcePayload = {
    id: string;
}

/**
 * Payload for navigating to a new screen in the history.
 *
 * @property {string} newScreen - The name of the screen
 */
export type HistoryPayload = {
    newScreen: string;
}

/**
 * Payload for setting the pagination state.
 *
 * @property {Pagination} pagination - The pagination
 */
export type PaginationPayload = {
    pagination: Pagination;
}

/**
 * Payload for indicating if there is more data to load.
 *
 * @property {boolean} hasMore - Whether there is more data to load
 */
export type HasMorePayload = {
    hasMore: boolean;
}

/**
 * Payload for triggering a refresh action.
 *
 * @property {boolean} refresh - Whether to trigger a refresh
 */
export type RefreshPayload = {
    refresh: boolean;
}