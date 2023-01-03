import React, { Children } from 'react';
import { TouchableHighlight, View, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

import { TableCell } from '../../ui';

import { usePreaching, useTheme } from '../../../hooks';

import { Preaching } from '../../../interfaces/preaching';

import { sumHours, sumNumbers } from '../../../utils';

import styles from './styles';

const tableHeaders = [
    'Día',
    'H/I',
    'H/F',
    'Pub',
    'Vid',
    'Rev'
];

export const PreachingTable = () => {
    const { navigate } = useNavigation();
    const { width } = useWindowDimensions();

    const { state: { preachings }, setSelectedPreaching } = usePreaching();
    const { state: { theme, colors } } = useTheme();

    const handleGoToEditPreaching = (preaching: Preaching) => {
        setSelectedPreaching(preaching);
        navigate('AddOrEditPreachingScreen' as never);
    }

    return (
        <View style={{ ...styles.table, borderColor: colors.background }}>
            <View style={ styles.tableRow }>
                {
                    Children.toArray(tableHeaders.map(head => (
                        <TableCell
                            text={ head }
                            style={{ width: width * 0.15 }}
                        />
                    )))
                }
            </View>

            {
                Children.toArray(preachings.map((preaching) => (
                    <TouchableHighlight
                        onPress={ () => handleGoToEditPreaching(preaching) }
                        underlayColor={ (theme === 'dark') ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)' }
                    >
                        <View style={{ ...styles.tableRow }}>
                            <TableCell
                                text={ dayjs(preaching.day).format('DD') }
                                style={{ backgroundColor: '#746C84', width: width * 0.15 }}
                            />

                            <TableCell
                                text={ dayjs(preaching.init_hour).format('HH:mm') }
                                style={{ backgroundColor: '#746C84', width: width * 0.15 }}
                            />

                            <TableCell
                                text={ dayjs(preaching.final_hour).format('HH:mm') }
                                style={{ backgroundColor: '#746C84', width: width * 0.15 }}
                            />

                            <TableCell
                                text={ preaching.posts }
                                style={{ backgroundColor: '#746C84', width: width * 0.15 }}
                            />

                            <TableCell
                                text={ preaching.videos }
                                style={{ backgroundColor: '#746C84', width: width * 0.15 }}
                            />

                            <TableCell
                                text={ preaching.revisits }
                                style={{ backgroundColor: '#746C84', width: width * 0.15 }}
                            />
                        </View>
                    </TouchableHighlight>
                )))
            }

            <View style={ styles.tableRow }>
                <TableCell
                    text="Total"
                    style={{ backgroundColor: '#544C63', width: width * 0.15 }}
                />

                <TableCell
                    text={ `${ sumHours(preachings.map(p => ({ init: p.init_hour, finish: p.final_hour }))) }H` }
                    style={{ backgroundColor: '#544C63', width: width * 0.30 }}
                />

                <TableCell
                    text={ sumNumbers(preachings.map(p => p.posts)) }
                    style={{ backgroundColor: '#544C63', width: width * 0.15 }}
                />

                <TableCell
                    text={ sumNumbers(preachings.map(p => p.videos)) }
                    style={{ backgroundColor: '#544C63', width: width * 0.15 }}
                />

                <TableCell
                    text={ sumNumbers(preachings.map(p => p.revisits)) }
                    style={{ backgroundColor: '#544C63', width: width * 0.15 }}
                />
            </View>
        </View>
    );
}