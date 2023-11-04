/**
 * PreachingStackParamsList is a type that is an object with two properties, HomeScreen and
 * AddOrEditPreachingScreen, where both properties are of type undefined.
 *
 * @property HomeScreen - undefined;
 * @property AddOrEditPreachingScreen - undefined;
 */
export type PreachingStackParamsList = {
    AddOrEditLessonScreen: undefined;
    AddOrEditPreachingScreen: undefined;
    HomeScreen: undefined;
    HomeLessonDetailScreen: undefined;
}

/**
 * Defining the structure of the PreachingState object.
 *
 * @property {boolean} isPreachingDeleting - This indicates if the preaching is being deleted.
 * @property {boolean} isPreachingLoading - This indicates if the preaching is being loaded.
 * @property {boolean} isPreachingsLoading - This indicates if the preachings are being loaded.
 * @property {Preaching[]} preachings - This is an array of preachings.
 * @property {Date} selectedDate - This is the selected date.
 * @property {Preaching} seletedPreaching - This is the selected preaching.
 */
export interface PreachingState {
    isPreachingDeleting: boolean;
    isPreachingLoading: boolean;
    isPreachingsLoading: boolean;
    preachings: Preaching[];
    selectedDate: Date;
    seletedPreaching: Preaching;
}

/**
 * Defining the structure of the Preaching object.
 *
 * @property {string} id - This is the id of the preaching.
 * @property {string} userId - This is the id of the user.
 * @property {string} day - This is the day of the preaching.
 * @property {string} initHour - This is the initial hour of the preaching.
 * @property {string} finalHour - This is the final hour of the preaching.
 * @property {string} createdAt - This is the created at of the preaching.
 * @property {string} updatedAt - This is the updated at of the preaching.
 */
export interface Preaching {
    id: string;
    userId: string;
    day: string;
    initHour: string;
    finalHour: string;
    createdAt: string;
    updatedAt: string;
}

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
 * PreachingPayload is an object with a property called preaching that is of type Preaching
 *
 * @property {Preaching} preaching - Preaching
 */
export type PreachingPayload = {
    preaching: Preaching
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
 * SetPreachingsPayload is an object with a preachings property that is an array of Preaching objects.
 *
 * @property {Preaching[]} preachings - Preaching[]
 */
export type SetPreachingsPayload = {
    preachings: Preaching[];
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
