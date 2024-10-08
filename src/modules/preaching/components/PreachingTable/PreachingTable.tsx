import React, { Children } from 'react';
import { TouchableHighlight, View, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { TableCell } from '@ui';

/* Hooks */
import { usePreaching } from '../../hooks';
import { useTheme } from '@theme';

/* Interfaces */
import { Preaching } from '../../interfaces';

/* Utils */
import { TABLE_PREACHING_HEADERS } from '../../utils';
import { date } from '@utils';

/* Styles */
import { stylesheet } from './styles';

/**
 * This component is responsible for displaying a table that contains the data
 * of the preaching days of the selectedDate.
 *
 * @returns {JSX.Element} The table component with the data of the preaching days.
 */
export const PreachingTable = (): JSX.Element => {
    const { width } = useWindowDimensions();

    const { styles } = useStyles(stylesheet);
    const navigation = useNavigation();

    const { state: { preachings }, setSelectedPreaching } = usePreaching();
    const { state: { theme } } = useTheme();

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
        navigation.navigate('AddOrEditPreachingScreen' as never);
    }

    return (
        <View
            style={ styles.table }
            testID="preaching-table"
        >

            {/* Table header */}
            <View style={ styles.tableRow }>
                { Children.toArray(TABLE_PREACHING_HEADERS.map((head, index) => (
                    <TableCell
                        text={ head }
                        style={{ width: (index <= 1) ? cellWidth : cellWidthHours }}
                    />
                ))) }
            </View>

            {/* Table body */}

            { Children.toArray(preachings.map((preaching, index) => (
                <TouchableHighlight
                    onPress={ () => handleGoToEditPreaching(preaching) }
                    testID="preaching-table-row"
                    underlayColor={ (theme === 'dark') ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)' }
                >
                    <View style={ styles.tableRow }>
                        <TableCell
                            text={ (index + 1).toString() }
                            style={{ backgroundColor: '#746C84', width: cellWidth }}
                        />

                        <TableCell
                            text={ date.format(preaching.day, 'DD') }
                            style={{ backgroundColor: '#746C84', width: cellWidth }}
                        />

                        <TableCell
                            text={ date.format(preaching.initHour, 'HH:mm') }
                            style={{ backgroundColor: '#746C84', width: cellWidthHours }}
                        />

                        <TableCell
                            text={ date.format(preaching.finalHour, 'HH:mm') }
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
                    text={ `${ date.sumHours(preachings.map(p => ({ init: p.initHour, finish: p.finalHour }))) }H` }
                    style={{ backgroundColor: '#544C63', width: cellWidthHours * 2 }}
                />
            </View>
        </View>
    );
}
