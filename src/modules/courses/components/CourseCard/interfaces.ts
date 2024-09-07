import { Course } from '../../interfaces';

/* Defining the props that the component will receive. */
export interface CourseCardProps {
    course: Course;
    onActiveOrSuspend: () => void;
    onDelete: () => void;
    onFinishOrStart: () => void;
}