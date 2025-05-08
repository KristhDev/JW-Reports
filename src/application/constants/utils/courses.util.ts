import { CourseFilter } from '@courses/interfaces';

export const coursesFilters: Record<Uppercase<CourseFilter>, CourseFilter> = {
    ACTIVE: 'active',
    ALL: 'all',
    FINISHED: 'finished',
    SUSPENDED: 'suspended',
}