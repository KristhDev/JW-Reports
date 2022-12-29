import React, { Children } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

const tableHeaders = [
    'Día',
    'H/I',
    'H/F',
    'Pub',
    'Vid',
    'Rev'
];

const tableContent = [
    {
        day: 1,
        init_hour: 5,
        final_hour: 10,
        pub: 10,
        videos: 4,
        rev: 4
    },
    {
        day: 2,
        init_hour: 5,
        final_hour: 10,
        pub: 10,
        videos: 4,
        rev: 4
    },
    {
        day: 3,
        init_hour: 5,
        final_hour: 10,
        pub: 10,
        videos: 4,
        rev: 4
    },
    {
        day: 4,
        init_hour: 5,
        final_hour: 10,
        pub: 10,
        videos: 4,
        rev: 4
    },
    {
        day: 5,
        init_hour: 5,
        final_hour: 10,
        pub: 10,
        videos: 4,
        rev: 4
    },
    {
        day: 6,
        init_hour: 5,
        final_hour: 10,
        pub: 10,
        videos: 4,
        rev: 4
    },
    {
        day: 9,
        init_hour: 5,
        final_hour: 10,
        pub: 10,
        videos: 4,
        rev: 4
    },
    {
        day: 10,
        init_hour: 5,
        final_hour: 10,
        pub: 10,
        videos: 4,
        rev: 4
    },
    {
        day: 12,
        init_hour: 5,
        final_hour: 10,
        pub: 10,
        videos: 4,
        rev: 4
    },
    {
        day: 15,
        init_hour: 5,
        final_hour: 10,
        pub: 10,
        videos: 4,
        rev: 4
    },
    {
        day: 18,
        init_hour: 5,
        final_hour: 10,
        pub: 10,
        videos: 4,
        rev: 4
    },
];

export const PreachingTable = () => {
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
                Children.toArray(tableContent.map(content => (
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ ...styles.tableBox, backgroundColor: '#746C84' }}>
                            <Text style={ styles.tableBoxText }>{ content.day }</Text>
                        </View>

                        <View style={{ ...styles.tableBox, backgroundColor: '#746C84' }}>
                            <Text style={ styles.tableBoxText }>{ content.init_hour }</Text>
                        </View>

                        <View style={{ ...styles.tableBox, backgroundColor: '#746C84' }}>
                            <Text style={ styles.tableBoxText }>{ content.final_hour }</Text>
                        </View>

                        <View style={{ ...styles.tableBox, backgroundColor: '#746C84' }}>
                            <Text style={ styles.tableBoxText }>{ content.pub }</Text>
                        </View>

                        <View style={{ ...styles.tableBox, backgroundColor: '#746C84' }}>
                            <Text style={ styles.tableBoxText }>{ content.videos }</Text>
                        </View>

                        <View style={{ ...styles.tableBox, backgroundColor: '#746C84' }}>
                            <Text style={ styles.tableBoxText }>{ content.rev }</Text>
                        </View>
                    </View>
                )))
            }
        </View>
    );
}