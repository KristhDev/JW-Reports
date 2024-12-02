import { LessonEntity } from '@domain/entities';

/* Defining the props that the LessonCard component will receive. */
export interface LessonCardProps {
    lesson: LessonEntity;
    onClick?: () => void;
    onDelete: () => void;
    onFinish: () => void;
    onNavigateDetail: () => void;
    onNavigateEdit: () => void;
}