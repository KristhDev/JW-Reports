import { CourseFilter } from '../../../interfaces/courses';

export interface CoursesListProps {
    emptyMessage: string;
    filter: CourseFilter;
    title: string;
}

export interface ListEmptyComponentProps {
    msg: string;
}