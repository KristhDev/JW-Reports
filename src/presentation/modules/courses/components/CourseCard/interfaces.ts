import { CourseEntity } from '@domain/entities';

/* Defining the props that the component will receive. */
export interface CourseCardProps {
    course: CourseEntity;
    onActiveOrSuspend: () => void;
    onDelete: () => void;
    onFinishOrStart: () => void;
}