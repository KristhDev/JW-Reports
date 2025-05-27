export interface FilterItem<FilterValue> {
    label: string;
    value: FilterValue;
}

export interface FiltersProps<FilterValue> {
    items: FilterItem<FilterValue>[];
    onFilterChange: (filter: FilterValue) => void;
    selectedFilter: FilterValue;
}