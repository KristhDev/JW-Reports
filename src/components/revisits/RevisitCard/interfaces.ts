import { Revisit } from '../../../interfaces/revisits';

/* Defining the props that the component will receive. */
export interface RevisitCardProps {
    onDelete: () => void;
    onPass: () => void;
    onRevisit: () => void;
    revisit: Revisit;
    screenToNavigate: string;
}