import React, { Children } from 'react';
import { Text, View } from 'react-native';
import dayjs from 'dayjs';

import { usePreaching } from '../../../hooks';

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
    const { state: { preachings } } = usePreaching();

    return (
        <View style={{ flex: 1, margin: 20 }}>
            <View style={{ flexDirection: 'row', width: '100%' }}>
                {
                    Children.toArray(tableHeaders.map(head => (
                        <View style={ styles.tableBox }>
                            <Text style={ styles.tableBoxText }>{ head }</Text>
                        </View>
                    )))
                }
            </View>

            {
                Children.toArray(preachings.map(preaching => (
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ ...styles.tableBox, backgroundColor: '#746C84' }}>
                            <Text style={ styles.tableBoxText }>{ dayjs(preaching.day).format('DD') }</Text>
                        </View>

                        <View style={{ ...styles.tableBox, backgroundColor: '#746C84' }}>
                            <Text style={ styles.tableBoxText }>{ dayjs(preaching.init_hour).format('HH:mm') }</Text>
                        </View>

                        <View style={{ ...styles.tableBox, backgroundColor: '#746C84' }}>
                            <Text style={ styles.tableBoxText }>{ dayjs(preaching.final_hour).format('HH:mm') }</Text>
                        </View>

                        <View style={{ ...styles.tableBox, backgroundColor: '#746C84' }}>
                            <Text style={ styles.tableBoxText }>{ preaching.posts }</Text>
                        </View>

                        <View style={{ ...styles.tableBox, backgroundColor: '#746C84' }}>
                            <Text style={ styles.tableBoxText }>{ preaching.videos }</Text>
                        </View>

                        <View style={{ ...styles.tableBox, backgroundColor: '#746C84' }}>
                            <Text style={ styles.tableBoxText }>{ preaching.revisits }</Text>
                        </View>
                    </View>
                )))
            }
        </View>
    );
}