import { RevisitFilter } from '../../interfaces';

export type RevisitsProps = {
    emptyMessage: string;
    filter: RevisitFilter;
    renderFab?: boolean;
    title: string;
}