import { Preaching, PreachingEndpoint } from '../interfaces';

/**
 * Creates a new Preaching object from a PreachingEndpoint object.
 *
 * @param {PreachingEndpoint} preaching - The PreachingEndpoint object to convert.
 * @return {Preaching} The converted Preaching object.
 */
export const preachingAdapter = (preaching: PreachingEndpoint): Preaching => ({
    id: preaching.id,
    userId: preaching.user_id,
    day: preaching.day,
    initHour: preaching.init_hour,
    finalHour: preaching.final_hour,
    createdAt: preaching.created_at,
    updatedAt: preaching.updated_at
});