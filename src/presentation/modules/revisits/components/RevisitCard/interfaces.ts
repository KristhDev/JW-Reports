import { RevisitEntity } from '@domain/entities';

/* Defining the props that the component will receive. */
export interface RevisitCardProps {
    navigateToDetail: () => void;
    navigateToEdit: () => void;
    onDelete: () => void;
    onPass: () => void;
    onRevisit: () => void;
    revisit: RevisitEntity;
}