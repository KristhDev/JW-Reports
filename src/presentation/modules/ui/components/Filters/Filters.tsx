import React, { JSX, useCallback } from 'react';
import { ScrollView, StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { Button } from '../Button';

/* Interfaces */
import { FilterItem, FiltersProps } from './interfaces';

/* Styles */
import { stylesheet } from './styles';

/**
 * A component that renders a set of filters. The filters are represented by a row of buttons.
 * Each button corresponds to a filter item. The component will call the onFilterChange callback
 * when the user selects a filter item. The callback will receive the value of the selected filter
 * item as an argument.
 *
 * @param {FiltersProps<FilterValue>} items - An array of filter items. Each item should contain a label and a value.
 * @param {(filter: FilterValue) => void} onFilterChange - A callback that will be called when the user selects a filter item.
 * @param {FilterValue} selectedFilter - The value of the currently selected filter item.
 * @returns A JSX element that renders the filters.
 */
export const Filters = <FilterValue, >({
    items,
    onFilterChange,
    selectedFilter,
}: FiltersProps<FilterValue>): JSX.Element => {
    const { styles, theme: { colors } } = useStyles(stylesheet);

    const pressableStyle = useCallback((item: FilterItem<FilterValue>) => {
        const style: StyleProp<ViewStyle> = [ styles.filterItemPressable ];
        if (item.value !== selectedFilter) style.push(styles.filterItemUnSelectedPressable);

        return style;
    }, [ selectedFilter ]);

    const textStyle = useCallback((item: FilterItem<FilterValue>) => {
        const style: StyleProp<TextStyle> = [ styles.filterItemText ];
        if (item.value !== selectedFilter) style.push(styles.filterItemUnSelectedText);

        return style;
    }, [ selectedFilter ]);

    const underlayColor = useCallback((item: FilterItem<FilterValue>) => {
        return item.value !== selectedFilter ? colors.buttonTranslucent : 'rgba(0, 0, 0, 0.30)';
    }, [ selectedFilter ]);

    return (
        <ScrollView 
            contentContainerStyle={[ styles.filtersContainer ]}
            horizontal
            showsHorizontalScrollIndicator={ false }
        >
            { items.map((item, index) => (
                <Button 
                    containerStyle={[ styles.filterItemContainer ]}
                    key={ `${ index }-${ item.value }` }
                    onPress={ () => onFilterChange(item.value) }
                    pressableStyle={ pressableStyle(item) }
                    text={ item.label }
                    textStyle={ textStyle(item) }
                    underlayColor={ underlayColor(item) }
                />
            )) }
        </ScrollView>
    );
}