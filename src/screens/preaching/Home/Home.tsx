import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';

import { ReportModal } from '../ReportModal';

import { PreachingTable } from '../../../components/preaching';
import { Fab, Title } from '../../../components/ui';

import { usePreaching, useTheme } from '../../../hooks';

import styles from './styles';

const Home = () => {
    const [ showModal, setShowModal ] = useState<boolean>(false);
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
        <>
            <ScrollView
                contentContainerStyle={{ alignItems: 'center', paddingBottom: 100 }}
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
                        name="reader-outline"
                        size={ 40 }
                    />
                }
                onPress={ () => setShowModal(true) }
                style={{ ...styles.fab, right: 80 }}
                touchColor={ colors.buttonDark }
            />

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
                onPress={ handleNavigate }
                style={ styles.fab }
                touchColor={ colors.buttonDark }
            />

            <ReportModal
                isOpen={ showModal }
                month={ month.toLowerCase() }
                onClose={ () => setShowModal(false) }
            />
        </>
    );
}

export default Home;