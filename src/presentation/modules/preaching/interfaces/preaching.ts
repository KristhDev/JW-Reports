/**
 * Defining the structure of stack navigation of preaching.
 *
 * @property PublisherStackNavigation - undefined;
 * @property PrecursorStackNavigation - undefined;
 */
export type PreachingStackParamsList = {
    PublisherStackNavigation: undefined;
    PrecursorStackNavigation: undefined;
}

/**
 * Defining the structure of stack navigation of precursor.
 *
 * @property HomeScreen - undefined;
 * @property AddOrEditPreachingScreen - undefined;
 */
export type PrecursorStackParamsList = {
    HomeScreen: undefined;
    AddOrEditPreachingScreen: undefined;
}

/**
 * Defining the structure of stack navigation of publisher.
*
 * @property HomeScreen - undefined;
 * @property LessonDetailScreen - undefined;
 * @property AddOrEditLessonScreen - undefined;
 * @property RevisitDetailScreen - undefined;
 * @property AddOrEditRevisitScreen - undefined;
 */
export type PublisherStackParamsList = {
    HomeScreen: undefined;
    LessonDetailScreen: undefined;
    AddOrEditLessonScreen: undefined;
    RevisitDetailScreen: undefined;
    AddOrEditRevisitScreen: undefined;
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
