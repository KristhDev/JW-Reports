import { LoadResourcesOptions } from '@ui';

/**
 * Defining the structure of the CourseFormValues object.
 *
 * @property {string} personName - The name of the person
 * @property {string} personAbout - The about of the person
 * @property {string} personAddress - The address of the person
 * @property {string} publication - The publication of the course
 */
export interface CourseFormValues {
    personName: string;
    personAbout: string;
    personAddress: string;
    publication: string;
}

/* Extending the LoadResourcesOptions interface with a new property called filter. */
export interface loadCoursesOptions extends LoadResourcesOptions {
    filter: CourseFilter;
}

export type CourseFilter = 'all' | 'active' | 'suspended' | 'finished';
