export interface SearchInputProps {
    onClean: () => void;
    onSearch: (search: string) => void;
    searchTerm: string;
}