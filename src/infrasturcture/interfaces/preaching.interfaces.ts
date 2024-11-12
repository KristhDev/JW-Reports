import { Precursor } from './auth.interfaces';

export type ParticipateInMinistry = 'si' | 'no';

/**
 * Defining the structure of the Preaching object in the endpoint.
 *
 * @property {string} id - This is the id of the preaching.
 * @property {string} user_id - This is the id of the user.
 * @property {string} day - This is the day of the preaching.
 * @property {string} init_hour - This is the initial hour of the preaching.
 * @property {string} final_hour - This is the final hour of the preaching.
 * @property {string} created_at - This is the created at of the preaching.
 * @property {string} updated_at - This is the updated at of the preaching.
 */
export interface PreachingEndpoint {
    id: string;
    user_id: string;
    day: string;
    init_hour: string;
    final_hour: string;
    created_at: string;
    updated_at: string;
}

/**
 * RemainingHoursOfWeeklyRequirement is an object with a remainingHoursOfWeeklyRequirement property that is a string
 * representing the remaining hours requirement.
 *
 * @property {string} remainingHoursOfWeeklyRequirement
 * @property {boolean} isNegative
 */
export type RemainingHoursOfWeeklyRequirement = {
    remainingHoursOfWeeklyRequirement: string;
    isNegative: boolean;
}

/**
 * ReamainingOfHoursRequirement is an object with a reamainingOfHoursRequirement property that is a string
 * representing the remaining hours requirement.
 *
 * @property {string} reamainingOfHoursRequirement
 * @property {boolean} isNegative
 */
export type ReamainingOfHoursRequirement = {
    reamainingOfHoursRequirement: string;
    isNegative: boolean;
}

export interface PreachingReportOptions {
    username: string;
    precursor: Precursor;
    month: string;
    hours: number;
    hoursLDC: number;
    participated: ParticipateInMinistry;
    courses: number;
    comment: string;
}