import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';

import { PreachingTable } from '../../../components/preaching';
import { Fab, Title } from '../../../components/ui';

import { usePreaching, useTheme } from '../../../hooks';

import styles from './styles';

const Home = () => {
    const { navigate } = useNavigation();

    const { state: { selectedDate } } = usePreaching();
    const { state: { colors } } = useTheme();

    const month = dayjs(selectedDate).format('MMMM').toUpperCase();
    const year = dayjs(selectedDate).get('year');

    return (
        <>
            <ScrollView
                contentContainerStyle={{ alignItems: 'center' }}
                style={{ flex: 1 }}
                overScrollMode="never"
            >
                <Title
                    containerStyle={ styles.titleContainerStyle }
                    text={ `INFORME DE ${ month } ${ year }` }
                    textStyle={{ fontSize: 24 }}
                />

                <PreachingTable />
            </ScrollView>

            <Fab
                color={ colors.button }
                icon={
                    <Icon
                        color={ colors.contentHeader }
                        name="add-circle-outline"
                        size={ 40 }
                        style={{ marginLeft: 3 }}
                    />
                }
                onPress={ () => navigate('AddPreachingScreen' as never) }
                style={ styles.fab }
                touchColor={ colors.buttonDark }
            />
        </>
    );
}

export default Home;