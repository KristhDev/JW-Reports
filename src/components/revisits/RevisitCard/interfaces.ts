import { Revisit } from '../../../interfaces/revisits';

export interface RevisitCardProps {
    onDelete: () => void;
    onPass: () => void;
    onRevisit: () => void;
    revisit: Revisit;
}