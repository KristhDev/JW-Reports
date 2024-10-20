/**
 * Defining the structure of stack navigation of preaching.
 *
 * @property AddOrEditLessonScreen - undefined;
 * @property AddOrEditPreachingScreen - undefined;
 * @property AddOrEditRevisitScreen - undefined;
 * @property HomeLessonDetailScreen - undefined;
 * @property HomeRevisitDetailScreen - undefined;
 * @property HomeScreen - undefined;
 */
export type PreachingStackParamsList = {
    AddOrEditLessonScreen: undefined;
    AddOrEditPreachingScreen: undefined;
    AddOrEditRevisitScreen: undefined;
    HomeLessonDetailScreen: undefined;
    HomeRevisitDetailScreen: undefined;
    HomeScreen: undefined;
}

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
