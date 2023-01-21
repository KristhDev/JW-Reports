import { Course } from '../../../interfaces/courses';

export interface CourseCardProps {
    course: Course;
    onActiveOrSuspend: () => void;
    onDelete: () => void;
    onFinishOrStart: () => void;
}