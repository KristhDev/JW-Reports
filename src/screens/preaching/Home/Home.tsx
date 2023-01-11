import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, useWindowDimensions, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';

import { ReportModal } from '../ReportModal';

import { PreachingTable } from '../../../components/preaching';
import { Fab, InfoText, Title } from '../../../components/ui';

import { usePreaching, useTheme } from '../../../hooks';

import themeStyles from '../../../theme/styles';

const Home = () => {
    const [ isRefreshing, setIsRefreshing ] = useState<boolean>(false);
    const [ showModal, setShowModal ] = useState<boolean>(false);
    const { navigate } = useNavigation();
    const { height } = useWindowDimensions();

    const { state: { selectedDate, preachings, isPreachingsLoading }, setSelectedPreaching, loadPreachings } = usePreaching();
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

    const handleRefreshing = () => {
        loadPreachings(selectedDate);
        setIsRefreshing(false);
    }

    return (
        <>
            <ScrollView
                contentContainerStyle={{ alignItems: 'center', paddingBottom: 100 }}
                overScrollMode="never"
                refreshControl={
                    <RefreshControl
                        colors={[ '#000' ]}
                        onRefresh={ handleRefreshing }
                        refreshing={ isRefreshing }
                    />
                }
                style={{ flex: 1 }}
            >
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    text={ `INFORME DE ${ month } ${ year }` }
                    textStyle={{ fontSize: 24 }}
                />

                {
                    (isPreachingsLoading) && (
                        <ActivityIndicator
                            color={ colors.button }
                            size={ 50 }
                            style={{ marginTop: height * 0.32 }}
                        />
                    )
                }

                {
                    (!isPreachingsLoading && preachings.length > 0) && (
                        <PreachingTable />
                    )
                }

                {
                    (!isPreachingsLoading && preachings.length === 0) && (
                        <InfoText
                            containerStyle={{ marginTop: height * 0.30 }}
                            text="No haz agregado ningún día de predicación para el informe de este mes."
                        />
                    )
                }
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
                style={{ ...themeStyles.fabBottomRight, right: 80 }}
                touchColor="rgba(0, 0, 0, 0.15)"
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
                style={ themeStyles.fabBottomRight }
                touchColor="rgba(0, 0, 0, 0.15)"
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