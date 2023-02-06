import React, { FC } from 'react';
import { Text, View } from 'react-native';

/* Hooks */
import { useTheme } from '../../../hooks';

/* Interfaces */
import { TableCellProps } from './interfaces';

/* Styles */
import styles from './styles';

/**
 * This component is responsible for displaying a cell for the tables
 * @param {TableCellProps} props { text: string, style: StyleProp<ViewStyle> } - This is the props
 * for functionality of the component
 * - text: This is the text of the cell
 * - style: This is the style of the cell, default is `undefined`
 */
export const TableCell: FC<TableCellProps> = ({ text, style }) => {
    const { state: { colors } } = useTheme();

    return (
        <View
            style={[
                { ...styles.tableCell, borderColor: colors.background },
                style
            ]}
        >
            <Text style={ styles.tableCellText }>{ text }</Text>
        </View>
    );
}