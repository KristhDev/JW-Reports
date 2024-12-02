import { RevisitEntity } from '@domain/entities';

/* Defining the props that the component will receive. */
export interface RevisitCardProps {
    onDelete: () => void;
    onNavigateDetail: () => void;
    onNavigateEdit: () => void;
    onPass: () => void;
    onRevisit: () => void;
    revisit: RevisitEntity;
}