/**
 * Defining the structure of the PreachingFormValues object.
 *
 * @property {Date} day - This is the day of the preaching.
 * @property {Date} initHour - This is the initial hour of the preaching.
 * @property {Date} finalHour - This is the final hour of the preaching.
 */
export interface PreachingFormValues {
    day: Date;
    initHour: Date;
    finalHour: Date;
}
