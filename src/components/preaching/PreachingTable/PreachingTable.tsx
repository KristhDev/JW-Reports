import React, { Children } from 'react';
import { TouchableHighlight, View, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

/* Components */
import { TableCell } from '../../ui';

/* Hooks */
import { usePreaching, useTheme } from '../../../hooks';

/* Interfaces */
import { Preaching } from '../../../interfaces/preaching';

/* Utils */
import { sumHours, sumNumbers, TABLE_PREACHING_HEADERS } from '../../../utils';

/* Styles */
import styles from './styles';

/**
 * This component is responsible for displaying a table that contains the data
 * of the preaching days of the selectedDate.
 *
 * @returns {JSX.Element} The table component with the data of the preaching days.
 */
export const PreachingTable = (): JSX.Element => {
    const { navigate } = useNavigation();
    const { width } = useWindowDimensions();

    const { state: { preachings }, setSelectedPreaching } = usePreaching();
    const { state: { selectedTheme, colors } } = useTheme();

    const cellWidth = (width - 24) / 6;
    const cellWidthHours = (width - 24) / 3;

    /**
     * I'm going to navigate to a screen called AddOrEditPreachingScreen, and I'm going to pass it a
     * preaching object.
     *
     * @param {Preaching} preaching - The preaching object.
     * @return {void} This function does not return anything.
     */
    const handleGoToEditPreaching = (preaching: Preaching): void => {
        setSelectedPreaching(preaching);
        navigate('AddOrEditPreachingScreen' as never);
    }

    return (
        <View
            style={{ ...styles.table, borderColor: colors.background }}
            testID="preaching-table"
        >

            {/* Table header */}
            <View style={ styles.tableRow }>
                {
                    Children.toArray(TABLE_PREACHING_HEADERS.map((head, index) => (
                        <TableCell
                            text={ head }
                            style={{ width: (index <= 1) ? cellWidth : cellWidthHours }}
                        />
                    )))
                }
            </View>

            {/* Table body */}

            { Children.toArray(preachings.map((preaching, index) => (
                <TouchableHighlight
                    onPress={ () => handleGoToEditPreaching(preaching) }
                    testID="preaching-table-row"
                    underlayColor={ (selectedTheme === 'dark') ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)' }
                >
                    <View style={{ ...styles.tableRow }}>
                        <TableCell
                            text={ index + 1 }
                            style={{ backgroundColor: '#746C84', width: cellWidth }}
                        />

                        <TableCell
                            text={ dayjs(preaching.day).format('DD') }
                            style={{ backgroundColor: '#746C84', width: cellWidth }}
                        />

                        <TableCell
                            text={ dayjs(preaching.init_hour).format('HH:mm') }
                            style={{ backgroundColor: '#746C84', width: cellWidthHours }}
                        />

                        <TableCell
                            text={ dayjs(preaching.final_hour).format('HH:mm') }
                            style={{ backgroundColor: '#746C84', width: cellWidthHours }}
                        />
                    </View>
                </TouchableHighlight>
            ))) }

            {/* Table footer */}
            <View style={ styles.tableRow }>
                <TableCell
                    text="Total"
                    style={{ backgroundColor: '#544C63', width: cellWidth * 2 }}
                />

                <TableCell
                    text={ `${ sumHours(preachings.map(p => ({ init: p.init_hour, finish: p.final_hour }))) }H` }
                    style={{ backgroundColor: '#544C63', width: cellWidthHours * 2 }}
                />
            </View>
        </View>
    );
}
