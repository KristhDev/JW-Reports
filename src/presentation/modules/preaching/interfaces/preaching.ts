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
