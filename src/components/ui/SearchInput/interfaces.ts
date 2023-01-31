export interface SearchInputProps {
    onClean: () => void;
    onSearch: (search: string) => void;
    refreshing: boolean;
    searchTerm: string;
}