import { Revisit } from '../../interfaces';

/* Defining the props that the component will receive. */
export interface RevisitCardProps {
    onDelete: () => void;
    onPass: () => void;
    onRevisit: () => void;
    revisit: Revisit;
    screenToNavigate: string;
}