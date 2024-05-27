import { User, UserEndpoint } from '../interfaces';

/**
 * Creates a User object from a UserEndpoint object.
 *
 * @param {UserEndpoint} user - The UserEndpoint object to convert.
 * @return {User} The converted User object.
 */
export const userAdpater = (user: UserEndpoint): User => ({
    id: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    precursor: user.precursor,
    hoursRequirement: +user.hours_requirement,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
});