import { CourseFilter } from '../../interfaces';

/* Defining the props that will be passed to the component. */
export interface CoursesListProps {
    emptyMessage: string;
    filter: CourseFilter;
    title: string;
}