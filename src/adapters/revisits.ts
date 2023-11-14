import { Revisit, RevisitEndpoint, RevisitFormValues } from '../interfaces';

/**
 * Converts a RevisitEndpoint object into a Revisit object.
 *
 * @param {RevisitEndpoint} data - The RevisitEndpoint object to be converted.
 * @return {Revisit} The converted Revisit object.
 */
export const revisitAdapter = (data: RevisitEndpoint): Revisit => ({
    id: data.id,
    userId: data.user_id,
    personName: data.person_name,
    about: data.about,
    address: data.address,
    photo: data.photo,
    nextVisit: data.next_visit,
    done: data.done,
    createdAt: data.created_at,
    updatedAt: data.updated_at
});

/**
 * Returns a new object with the properties of the input object `data`
 * renamed to match the properties of the `RevisitFormValues` interface.
 *
 * @param {RevisitFormValues} data - An object containing the values of a form
 * for a revisit.
 * @return {Object} An object with the properties `person_name`, `about`,
 * `address`, and `next_visit` which correspond to the input object's values.
 */
export const revisitFormValuesAdapter = (data: RevisitFormValues) => ({
    person_name: data.personName,
    about: data.about,
    address: data.address,
    next_visit: data.nextVisit
});