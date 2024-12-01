import { RevisitEntity } from '@domain/entities';

/* Defining the props that the component will receive. */
export interface RevisitCardProps {
    onDelete: () => void;
    onPass: () => void;
    onRevisit: () => void;
    revisit: RevisitEntity;
    screenToDetailNavigate: string;
    screenToEditNavigate: string;
}