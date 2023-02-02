import { RevisitFilter } from '../../../interfaces/revisits';

/* Defining the interface for the props that will be passed to the component. */
export interface RevisitsListProps {
    emptyMessage: string;
    filter: RevisitFilter;
    title: string;
}