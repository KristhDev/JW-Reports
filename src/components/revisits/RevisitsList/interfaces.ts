import { RevisitFilter } from '../../../interfaces/revisits';

export interface RevisitsListProps {
    emptyMessage: string;
    filter: RevisitFilter;
    title: string;
}

export interface ListEmptyComponentProps {
    msg: string;
}