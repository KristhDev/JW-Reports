/* Models */
import { ImageModel } from '@domain/models';

/* Interfaces */
import { LoadResourcesOptions } from '@ui';

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
    image: ImageModel | null;
    onFinish?: () => void;
    revisitValues: RevisitFormValues;
}

/**
 * Defining the structure of the UpdateRevisitOptions object.
 *
 * @property {Image | undefined} image - This is the image of the revisit.
 * @property {RevisitFormValues} revisitValues - This is the revisit values to update.
 */
export type UpdateRevisitOptions = Pick<SaveRevisitOptions, 'image' | 'revisitValues'>;

/* Extending the LoadResourcesOptions interface. */
export interface loadRevisitsOptions extends LoadResourcesOptions {
    filter: RevisitFilter;
}

export type RevisitFilter = 'all' | 'visited' | 'unvisited';

