import React, { JSX, useCallback } from 'react';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { Button } from '../Button';
import { FilterItem, FiltersProps } from './interfaces';

import { stylesheet } from './styles';

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
        <View style={[ styles.filtersContainer ]}>
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
        </View>
    );
}