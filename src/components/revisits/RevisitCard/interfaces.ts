import { Revisit } from '../../../interfaces/revisits';

export interface RevisitCardProps {
    onDelete: () => void;
    onRevisit: () => void;
    revisit: Revisit;
}