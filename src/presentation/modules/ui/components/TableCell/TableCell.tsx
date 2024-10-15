import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* Interfaces */
import { TableCellProps } from './interfaces';

/* Styles */
import { stylesheet } from './styles';

/**
 * This component is responsible for displaying a cell for the tables
 *
 * @param {TableCellProps} props { text: string, style: StyleProp<ViewStyle> } - This is the props
 * for functionality of the component
 * - text: This is the text of the cell
 * - style: This is the style of the cell, default is `undefined`
 * @return {JSX.Element} Return jsx element to render cell of table
 */
export const TableCell: FC<TableCellProps> = ({ text, style }): JSX.Element => {
    const { styles } = useStyles(stylesheet);

    return (
        <View style={[ styles.tableCell, style ]}>
            <Text
                style={ styles.tableCellText }
                testID="table-cell-text"
            >
                { text }
            </Text>
        </View>
    );
}