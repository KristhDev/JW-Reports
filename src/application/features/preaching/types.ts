import { PreachingEntity } from '@domain/entities';

/**
 * Defining the structure of the PreachingState object.
 *
 * @property {boolean} isPreachingDeleting - This indicates if the preaching is being deleted.
 * @property {boolean} isPreachingLoading - This indicates if the preaching is being loaded.
 * @property {boolean} isPreachingsExporting - This indicates if the preachings are being exported.
 * @property {boolean} isPreachingsLoading - This indicates if the preachings are being loaded.
 * @property {PreachingEntity[]} preachings - This is an array of preachings.
 * @property {Date} selectedDate - This is the selected date.
 * @property {PreachingEntity} seletedPreaching - This is the selected preaching.
 */
export interface PreachingState {
    isPreachingDeleting: boolean;
    isPreachingLoading: boolean;
    isPreachingsExporting: boolean;
    isPreachingsLoading: boolean;
    preachings: PreachingEntity[];
    selectedDate: Date;
    seletedPreaching: PreachingEntity;
}

/**
 * PreachingPayload is an object with a property called preaching that is of type PreachingEntity
 *
 * @property {PreachingEntity} preaching - PreachingEntity
 */
export type PreachingPayload = {
    preaching: PreachingEntity
}

/**
 * SetSelectedDatePayload is an object with a property called selectedDate that is a Date.
 *
 * @property {Date} selectedDate - Date;
 */
export type SetSelectedDatePayload = {
    selectedDate: Date;
}

/**
 * SetPreachingsPayload is an object with a preachings property that is an array of PreachingEntity objects.
 *
 * @property {PreachingEntity[]} preachings - PreachingEntity[]
 */
export type SetPreachingsPayload = {
    preachings: PreachingEntity[];
}