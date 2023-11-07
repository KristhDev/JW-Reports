import { Lesson } from '../../../interfaces';

/* Defining the props that the LessonCard component will receive. */
export interface LessonCardProps {
    lesson: Lesson;
    screenToNavigate: string;
    onClick?: () => void;
    onDelete: () => void;
    onFinish: () => void;
}