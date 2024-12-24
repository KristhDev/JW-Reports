import { LessonEntity } from '@domain/entities';

/* Defining the props that the LessonCard component will receive. */
export interface LessonCardProps {
    lesson: LessonEntity;
    navigateToDetail: () => void;
    navigateToEdit: () => void;
    onClick?: () => void;
    onDelete: () => void;
    onFinish: () => void;
}