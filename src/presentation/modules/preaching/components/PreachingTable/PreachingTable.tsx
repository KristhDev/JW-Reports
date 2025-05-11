import React, { Children } from 'react';
import { TouchableHighlight, View, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

/* Config */
import { timeAdapter, publisherService } from '@config/di';

/* Entities */
import { PreachingEntity } from '@domain/entities';

/* Components */
import { TableCell } from '@ui/components';

/* Hooks */
import { usePreaching } from '../../hooks';

/* Styles */
import { stylesheet } from './styles';

/**
 * This component is responsible for displaying a table that contains the data
 * of the preaching days of the selectedDate.
 *
 * @returns {JSX.Element} The table component with the data of the preaching days.
 */
export const PreachingTable = (): JSX.Element => {
    const TABLE_PREACHING_HEADERS = publisherService.TABLE_PREACHING_HEADERS;
    const { width } = useWindowDimensions();

    const { styles, theme: { colors } } = useStyles(stylesheet);
    const router = useRouter();

    const { state: { preachings }, setSelectedPreaching } = usePreaching();

    const cellWidth = (width - 24) / 6;
    const cellWidthHours = (width - 24) / 3;

    /**
     * I'm going to navigate to a screen called AddOrEditPreachingScreen, and I'm going to pass it a
     * preaching object.
     *
     * @param {PreachingEntity} preaching - The preaching object.
     * @return {void} This function does not return anything.
     */
    const handleGoToEditPreaching = (preaching: PreachingEntity): void => {
        setSelectedPreaching(preaching);
        router.navigate('/(app)/(tabs)/preaching/precursor/add-or-edit');
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
                    underlayColor={ colors.tableHover }
                >
                    <View style={ styles.tableRow }>
                        <TableCell
                            text={ (index + 1).toString() }
                            style={{ backgroundColor: colors.tableRow, width: cellWidth }}
                        />

                        <TableCell
                            text={ timeAdapter.format(preaching.day, timeAdapter.formats.DAY) }
                            style={{ backgroundColor: colors.tableRow, width: cellWidth }}
                        />

                        <TableCell
                            text={ timeAdapter.format(preaching.initHour, timeAdapter.formats.HOURS_MINUTES) }
                            style={{ backgroundColor: colors.tableRow, width: cellWidthHours }}
                        />

                        <TableCell
                            text={ timeAdapter.format(preaching.finalHour, timeAdapter.formats.HOURS_MINUTES) }
                            style={{ backgroundColor: colors.tableRow, width: cellWidthHours }}
                        />
                    </View>
                </TouchableHighlight>
            ))) }

            {/* Table footer */}
            <View style={ styles.tableRow }>
                <TableCell
                    text="Total"
                    style={{ backgroundColor: colors.tableFooter, width: cellWidth * 2 }}
                />

                <TableCell
                    text={ `${ timeAdapter.sumHours(preachings.map(p => ({ init: p.initHour, finish: p.finalHour }))) }H` }
                    style={{ backgroundColor: colors.tableFooter, width: cellWidthHours * 2 }}
                />
            </View>
        </View>
    );
}
