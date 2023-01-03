import React from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';

import { PreachingTable } from '../../../components/preaching';
import { Button, Title } from '../../../components/ui';

import { usePreaching, useTheme } from '../../../hooks';

import styles from './styles';

const Home = () => {
    const { navigate } = useNavigation();

    const { state: { selectedDate }, setSelectedPreaching } = usePreaching();
    const { state: { colors } } = useTheme();

    const month = dayjs(selectedDate).format('MMMM').toUpperCase();
    const year = dayjs(selectedDate).get('year');

    const handleNavigate = () => {
        setSelectedPreaching({
            id: '',
            user_id: '',
            day: new Date().toString(),
            init_hour: new Date().toString(),
            final_hour: new Date().toString(),
            posts: 0,
            videos: 0,
            revisits: 0,
            created_at: new Date().toString(),
            updated_at: new Date().toString()
        });

        navigate('AddOrEditPreachingScreen' as never);
    }

    return (
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

            <View style={ styles.actionsContainer }>
                <Button
                    containerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}
                    icon={
                        <Icon
                            color={ colors.contentHeader }
                            name="add-circle-outline"
                            size={ 30 }
                            style={{ marginLeft: 3 }}
                        />
                    }
                    onPress={ handleNavigate }
                    text="Agregar Día"
                    touchableStyle={{ marginRight: 10 }}
                />

                <Button
                    containerStyle={{ paddingHorizontal: 10, paddingVertical: 8 }}
                    icon={
                        <Icon
                            color={ colors.contentHeader }
                            name="reader-outline"
                            size={ 25 }
                            style={{ marginLeft: 3 }}
                        />
                    }
                    onPress={ () => {} }
                    text="Entregar Informe"
                />
            </View>

            <PreachingTable />
        </ScrollView>
    );
}

export default Home;