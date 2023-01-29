import { Lesson } from '../../../interfaces/courses';

export interface LessonCardProps {
    lesson: Lesson;
    onDelete: () => void;
    onFinish: () => void;
}