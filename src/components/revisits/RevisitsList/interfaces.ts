export interface RevisitsListProps {
    emptyMessage: string;
    filter: 'all' | 'visited' | 'unvisited';
    title: string;
}

export interface ListEmptyComponentProps {
    msg: string;
}