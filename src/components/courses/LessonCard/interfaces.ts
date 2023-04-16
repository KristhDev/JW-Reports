import { Lesson } from '../../../interfaces/courses';

/* Defining the props that the LessonCard component will receive. */
export interface LessonCardProps {
    lesson: Lesson;
    onDelete: () => void;
    onFinish: () => void;
}