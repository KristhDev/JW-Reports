import { Revisit } from '../../../interfaces/revisits';

export interface RevisitCardProps {
    onDelete: () => void;
    revisit: Revisit;
}