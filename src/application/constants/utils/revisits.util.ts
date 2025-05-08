import { RevisitFilter } from '@revisits/interfaces';

export const revisitsFilters: Record<Uppercase<RevisitFilter>, RevisitFilter> = {
    ALL: 'all',
    UNVISITED: 'unvisited',
    VISITED: 'visited',
}