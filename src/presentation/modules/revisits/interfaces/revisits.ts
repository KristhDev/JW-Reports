/* Models */
import { ImageModel } from '@domain/models';

/* Interfaces */
import { LoadResourcesOptions } from '@ui';

/**
 * RevisitsStackParamsList is a type that is an object with three properties, each of which is a
 * screens that takes no parameters and returns undefined.
 *
 * @property RevisitsTopTabsNavigation - This is the top level tab navigator.
 * @property RevisitDetailScreen - undefined;
 * @property AddOrEditRevisitScreen - undefined;
 */
export type RevisitsStackParamsList = {
    RevisitsTopTabsNavigation: undefined;
    RevisitDetailScreen: undefined;
    AddOrEditRevisitScreen: undefined;
}

/**
 * RevisitsTopTabsParamsList is a type that has three properties, each of which is an object with three
 * properties.
 *
 * @property RevisitsScreen - {
 * @property VisitedRevisitsScreen - {
 * @property UnvisitedRevisitsScreen - {
 */
export type RevisitsTopTabsParamsList = {
    RevisitsScreen: {
        emptyMessage: string,
        filter: RevisitFilter,
        title: string
    },
    VisitedRevisitsScreen: {
        emptyMessage: string,
        filter: RevisitFilter,
        title: string
    },
    UnvisitedRevisitsScreen: {
        emptyMessage: string,
        filter: RevisitFilter,
        title: string
    }
}

/**
 * Defining the structure of the RevisitFormValues object.
 *
 * @property {string} personName - This is the name of the person.
 * @property {string} about - This is the about of the person.
 * @property {string} address - This is the address of the person.
 * @property {Date} nextVisit - This is the next visit of the person.
 */
export interface RevisitFormValues {
    personName: string;
    about: string;
    address: string;
    nextVisit: Date;
}

/**
 * Defining the structure of the SaveRevisitOptions object.
 *
 * @property {boolean | undefined} back - This is the back of the revisit.
 * @property {Image | undefined} image - This is the image of the revisit.
 * @property {() => void | undefined} onFinish - This is the finish of the revisit.
 * @property {RevisitFormValues} revisitValues - This is the revisit values to save.
 */
export interface SaveRevisitOptions {
    back?: boolean;
    image: ImageModel | null;
    onFinish?: () => void;
    revisitValues: RevisitFormValues;
}

/* Extending the LoadResourcesOptions interface. */
export interface loadRevisitsOptions extends LoadResourcesOptions {
    filter: RevisitFilter;
}

export type RevisitFilter = 'all' | 'visited' | 'unvisited';

