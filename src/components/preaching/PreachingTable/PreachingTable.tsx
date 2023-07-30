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
                    Children.toArray(TABLE_PREACHING_HEADERS.map(head => (
                        <TableCell
                            text={ head }
                            style={{ width: cellWidth }}
                        />
                    )))
                }
            </View>

            {/* Table body */}

            {
                Children.toArray(preachings.map((preaching) => (
                    <TouchableHighlight
                        onPress={ () => handleGoToEditPreaching(preaching) }
                        testID="preaching-table-row"
                        underlayColor={ (selectedTheme === 'dark') ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)' }
                    >
                        <View style={{ ...styles.tableRow }}>
                            <TableCell
                                text={ dayjs(preaching.day).format('DD') }
                                style={{ backgroundColor: '#746C84', width: cellWidth }}
                            />

                            <TableCell
                                text={ dayjs(preaching.init_hour).format('HH:mm') }
                                style={{ backgroundColor: '#746C84', width: cellWidth }}
                            />

                            <TableCell
                                text={ dayjs(preaching.final_hour).format('HH:mm') }
                                style={{ backgroundColor: '#746C84', width: cellWidth }}
                            />

                            <TableCell
                                text={ preaching.publications }
                                style={{ backgroundColor: '#746C84', width: cellWidth }}
                            />

                            <TableCell
                                text={ preaching.videos }
                                style={{ backgroundColor: '#746C84', width: cellWidth }}
                            />

                            <TableCell
                                text={ preaching.revisits }
                                style={{ backgroundColor: '#746C84', width: cellWidth }}
                            />
                        </View>
                    </TouchableHighlight>
                )))
            }

            {/* Table footer */}
            <View style={ styles.tableRow }>
                <TableCell
                    text="Total"
                    style={{ backgroundColor: '#544C63', width: cellWidth }}
                />

                <TableCell
                    text={ `${ sumHours(preachings.map(p => ({ init: p.init_hour, finish: p.final_hour }))) }H` }
                    style={{ backgroundColor: '#544C63', width: cellWidth * 2 }}
                />

                <TableCell
                    text={ sumNumbers(preachings.map(p => p.publications)) }
                    style={{ backgroundColor: '#544C63', width: cellWidth }}
                />

                <TableCell
                    text={ sumNumbers(preachings.map(p => p.videos)) }
                    style={{ backgroundColor: '#544C63', width: cellWidth }}
                />

                <TableCell
                    text={ sumNumbers(preachings.map(p => p.revisits)) }
                    style={{ backgroundColor: '#544C63', width: cellWidth }}
                />
            </View>
        </View>
    );
}