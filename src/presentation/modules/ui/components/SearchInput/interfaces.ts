/* Defining the props that the component will receive. */
export interface SearchInputProps {
    onClean: () => void;
    onSearch: (search: string) => void;
    refreshing: boolean;
    searchTerm: string;
}