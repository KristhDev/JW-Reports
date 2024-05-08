import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, useWindowDimensions, RefreshControl } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

/* Features */
import { INIT_PREACHING } from '../../features';

/* Screens */
import { ReportModal } from '../ReportModal';
import { PreachingInfoModal } from '../PreachingInfoModal';

/* Components */
import { PreachingTable } from '../../components';
import { Fab, InfoText, Title } from '../../../ui';

/* Hooks */
import { useAuth } from '../../../auth';
import { usePreaching } from '../../hooks';

/* Utils */
import { date } from '../../../../utils';

/* Theme */
import { styles as themeStylesheet } from '../../../theme';

/**
 * This screen is in charge of grouping the components to list the preaching days by
 * selectedDate, in addition to being the main screen that is shown to the
 * authenticated user.
 *
 * @return {JSX.Element} rendered component to show list of preaching days
 */
const Home = (): JSX.Element => {
    const [ isRefreshing, setIsRefreshing ] = useState<boolean>(false);
    const [ showReportModal, setShowReportModal ] = useState<boolean>(false);
    const [ showPreachingInfoModal, setShowPreachingInfoModal ] = useState<boolean>(false);
    const { navigate } = useNavigation();
    const { height } = useWindowDimensions();

    const { state: { user } } = useAuth();
    const { state: { selectedDate, preachings, isPreachingsLoading }, setSelectedPreaching, loadPreachings } = usePreaching();
    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const month = date.format(selectedDate,'MMMM').toUpperCase();
    const currentMonth = date.format(new Date(), 'MMMM').toUpperCase();
    const year = date.getYearOfDate(selectedDate);

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
            initHour: new Date().toString(),
            finalHour: new Date().toString()
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
                contentContainerStyle={{ alignItems: 'center', padding: margins.md, paddingBottom: 100 }}
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
                    textStyle={{ fontSize: fontSizes.md }}
                />

                {/* If the preachings are loading, show a loading indicator */}
                { (isPreachingsLoading) && (
                    <ActivityIndicator
                        color={ colors.button }
                        size={ (fontSizes.xxl + 2) }
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

            { ((currentMonth === month) && preachings.length > 0 && Boolean(user?.hoursRequirement) && user?.hoursRequirement > 0) && (
                <Fab
                    color={ colors.button }
                    icon={
                        <Icon
                            color={ colors.contentHeader }
                            name="information-circle-outline"
                            size={ (fontSizes.xl + 1) }
                        />
                    }
                    onPress={ () => setShowPreachingInfoModal(true) }
                    style={{ ...themeStyles.fabBottomRight, bottom: 150 }}
                    touchColor="rgba(0, 0, 0, 0.15)"
                />
            ) }

            <Fab
                color={ colors.button }
                icon={
                    <Icon
                        color={ colors.contentHeader }
                        name="reader-outline"
                        size={ fontSizes.xl }
                    />
                }
                onPress={ () => setShowReportModal(true) }
                style={{ ...themeStyles.fabBottomRight, bottom: 84 }}
                touchColor="rgba(0, 0, 0, 0.15)"
            />

            <Fab
                color={ colors.button }
                icon={
                    <Icon
                        color={ colors.contentHeader }
                        name="add-circle-outline"
                        size={ fontSizes.xl }
                    />
                }
                onPress={ handleNavigate }
                style={ themeStyles.fabBottomRight }
                touchColor="rgba(0, 0, 0, 0.15)"
            />

            <PreachingInfoModal
                isOpen={ showPreachingInfoModal }
                onClose={ () => setShowPreachingInfoModal(false) }
            />

            {/* Modal for show report */}
            <ReportModal
                isOpen={ showReportModal }
                month={ month.toLowerCase() }
                onClose={ () => setShowReportModal(false) }
            />
        </>
    );
}

export default Home;