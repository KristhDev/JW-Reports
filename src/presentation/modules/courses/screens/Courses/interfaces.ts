import { CourseFilter } from '../../interfaces';

export type CoursesProps = {
    emptyMessage: string;
    filter: CourseFilter;
    renderFab?: boolean;
    title: string;
}