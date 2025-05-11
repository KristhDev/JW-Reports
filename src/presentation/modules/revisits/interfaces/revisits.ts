/* Models */
import { ImageModel } from '@domain/models';
import { UtilFunctions } from '@shared/interfaces';

/* Interfaces */
import { LoadResourcesOptions } from '@ui/interfaces';

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
 * @property {RevisitFormValues & { image: ImageModel | null }} revisitValues - This is the revisit values to save.
 */
export interface SaveRevisitOptions extends UtilFunctions {
    revisitValues: RevisitFormValues & { image: ImageModel | null };
    successMessage: string;
}

/**
 * Defining the structure of the UpdateRevisitOptions object.
 *
 * @property {Image | undefined} image - This is the image of the revisit.
 * @property {RevisitFormValues} revisitValues - This is the revisit values to update.
 */
export type UpdateRevisitOptions = UtilFunctions & Pick<SaveRevisitOptions, 'revisitValues'>;

/* Extending the LoadResourcesOptions interface. */
export interface loadRevisitsOptions extends LoadResourcesOptions {
    filter: RevisitFilter;
}

export type RevisitFilter = 'all' | 'visited' | 'unvisited';

