import React, { Children } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

import { usePreaching, useTheme } from '../../../hooks';

import { Preaching } from '../../../interfaces/preaching';

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
    const { state: { preachings }, setSelectedPreaching } = usePreaching();
    const { state: { theme } } = useTheme();

    const handleGoToEditPreaching = (preaching: Preaching) => {
        setSelectedPreaching(preaching);
        navigate('AddOrEditPreachingScreen' as never);
    }

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
                    <TouchableHighlight
                        onPress={ () => handleGoToEditPreaching(preaching) }
                        underlayColor={ (theme === 'dark') ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)' }
                    >
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
                    </TouchableHighlight>
                )))
            }
        </View>
    );
}