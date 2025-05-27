import { RevisitFilter } from '@revisits/interfaces';

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

export interface RevisitsMessages {
    ABOUT_MIN_LENGTH: string;
    ABOUT_REQUIRED: string;
    ADDED_SUCCESS: string;
    ADDRESS_MIN_LENGTH: string;
    ADDRESS_REQUIRED: string;
    COMPLETED_SUCCESS: string;
    DELETED_SUCCESS: string;
    EXPORTED_SUCCESS: string;
    NEXT_VISIT_REQUIRED: string;
    PERSON_NAME_MIN_LENGTH: string;
    PERSON_NAME_REQUIRED: string;
    UNSELECTED_COMPLETE: string;
    UNSELECTED_DELETE: string;
    UNSELECTED_UPDATE: string;
    UPDATED_SUCCESS: string;
}

export interface RevisitsPlaceholders {
    ABOUT: string;
    ADDRESS: string;
    NEXT_VISIT: string;
    PERSON_NAME: string;
}

export interface RevisitFilterItem {
    label: string;
    value: RevisitFilter;
}