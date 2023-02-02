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
 * @param {TableCellProps} props - { text, style }
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