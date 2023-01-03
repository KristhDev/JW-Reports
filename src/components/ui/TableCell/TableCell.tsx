import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { useTheme } from '../../../hooks';

import { TableCellProps } from './interfaces';

import styles from './styles';

export const TableCell: FC<TableCellProps> = ({ text, style }) => {
    const { state: { colors } } = useTheme();

    return (
        <View style={[
            {
                ...styles.tableCell,
                borderColor: colors.background
            },
            style
        ]}>
            <Text style={ styles.tableCellText }>{ text }</Text>
        </View>
    );
}