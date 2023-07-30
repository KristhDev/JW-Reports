import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, useWindowDimensions, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';

/* Features */
import { INIT_PREACHING } from '../../../features/preaching';

/* Screens */
import { ReportModal } from '../ReportModal';

/* Components */
import { PreachingTable } from '../../../components/preaching';
import { Fab, InfoText, Title } from '../../../components/ui';

/* Hooks */
import { usePreaching, useTheme } from '../../../hooks';

/* Theme */
import { styles as themeStyles } from '../../../theme';

/**
 * This screen is in charge of grouping the components to list the preaching days by
 * selectedDate, in addition to being the main screen that is shown to the
 * authenticated user.
 *
 * @return {JSX.Element} rendered component to show list of preaching days
 */
const Home = (): JSX.Element => {
    const [ isRefreshing, setIsRefreshing ] = useState<boolean>(false);
    const [ showModal, setShowModal ] = useState<boolean>(false);
    const { navigate } = useNavigation();
    const { height } = useWindowDimensions();

    const { state: { selectedDate, preachings, isPreachingsLoading }, setSelectedPreaching, loadPreachings } = usePreaching();
    const { state: { colors } } = useTheme();

    const month = dayjs(selectedDate).format('MMMM').toUpperCase();
    const year = dayjs(selectedDate).get('year');

    /**
     * I'm trying to set the state of the selectedPreaching object to the INIT_PREACHING object, but I
     * want to change the day, init_hour and final_hour properties to the current date
     *
     * @return {void} This function does not return anything
     */
    const handleNavigate = (): void => {
        setSelectedPreaching({
            ...INIT_PREACHING,
            day: new Date().toString(),
            init_hour: new Date().toString(),
            final_hour: new Date().toString()
        });

        navigate('AddOrEditPreachingScreen' as never);
    }

    /**
     * When the user swipes down to refresh, load the preachings for the selected date and set the
     * refreshing state to false.
     *
     * @return {void} This function does not return anything
     */
    const handleRefreshing = (): void => {
        loadPreachings(selectedDate);
        setIsRefreshing(false);
    }

    return (
        <>
            <ScrollView
                contentContainerStyle={{ alignItems: 'center', padding: 24, paddingBottom: 100 }}
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

                {/* If the preachings are loading, show a loading indicator */}
                { (isPreachingsLoading) && (
                    <ActivityIndicator
                        color={ colors.button }
                        size={ 50 }
                        style={{ marginTop: height * 0.32 }}
                        testID="home-loading"
                    />
                ) }

                {/* If the preachings are not loading, show the preachings */}
                { (!isPreachingsLoading && preachings.length > 0) && (
                    <PreachingTable />
                ) }

                {/* If the preachings are not loading and there are no preachings, show a message */}
                { (!isPreachingsLoading && preachings.length === 0) && (
                    <InfoText
                        containerStyle={{ marginTop: height * 0.30 }}
                        text="No has agregado ningún día de predicación para el informe de este mes."
                    />
                ) }
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

            {/* Modal for show report */}
            <ReportModal
                isOpen={ showModal }
                month={ month.toLowerCase() }
                onClose={ () => setShowModal(false) }
            />
        </>
    );
}

export default Home;