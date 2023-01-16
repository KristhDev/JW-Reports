import { Course } from '../../../interfaces/courses';

export interface CourseCardProps {
    onDelete: () => void;
    onCourse: () => void;
    course: Course;
}