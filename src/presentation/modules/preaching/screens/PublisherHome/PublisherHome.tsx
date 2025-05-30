import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { Href, useRouter } from 'expo-router';
import { useStyles } from 'react-native-unistyles';
import Ionicons from '@expo/vector-icons/Ionicons';

/* Entities */
import { LessonEntity, RevisitEntity } from '@domain/entities';

/* Components */
import { LessonCard } from '@lessons/components';
import { RevisitCard } from '@revisits/components';
import { Fab, InfoText, Title } from '@ui/components';

/* Hooks */
import { useCourses } from '@courses/hooks';
import { useLessons } from '@lessons/hooks';
import { useRevisits } from '@revisits/hooks';

/* Theme */
import { themeStylesheet } from '@theme/styles';
import { useTranslation } from '@ui/hooks';

/**
 * This screen is in charge of grouping the components to list the preaching days by
 * selectedDate, in addition to being the main screen that is shown to the
 * authenticated user.
 *
 * @return {JSX.Element} rendered component to show list of preaching days
 */
const PublisherHome = (): JSX.Element => {
    const [ isRefreshing, setIsRefreshing ] = useState<boolean>(false);

    const router = useRouter();
    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const { setSelectedCourse } = useCourses();
    const { state: { isLastLessonLoading, lastLesson }, loadLastLesson, setSelectedLesson } = useLessons();
    const { state: { isLastRevisitLoading, lastRevisit }, setSelectedRevisit, loadLastRevisit } = useRevisits();

    const { translate } = useTranslation();

    const lastLessonTitle = translate('screens.ui.titles.last', { 
        attribute: translate('entities.lesson') 
    }).toUpperCase();

    const lastRevisitTitle = translate('screens.ui.titles.last', { 
        attribute: translate('entities.revisit') 
    }).toUpperCase();

    /**
     * Refreshes the state by loading the most recent lesson and revisit data.
     * Sets the refreshing state to false before and after the load operations.
     *
     * @return {Promise<void>} A promise that resolves when the refresh is complete.
     */
    const handleRefreshing = async (): Promise<void> => {
        setIsRefreshing(false);
        await Promise.all([ loadLastLesson(), loadLastRevisit() ]);
        setIsRefreshing(false);
    }

    const handleShowLessonModal = (lesson: LessonEntity, href: Href): void => {
        setSelectedLesson(lesson);
        router.navigate(href);
    }

    const handleShowRevisitModal = (revisit: RevisitEntity, href: Href): void => {
        setSelectedRevisit(revisit);
        router.navigate(href);
    }

    return (
        <>
            <ScrollView
                contentContainerStyle={{ alignItems: 'center', paddingHorizontal: margins.xs, paddingTop: margins.md, paddingBottom: 100 }}
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
                    containerStyle={{ ...themeStyles.titleContainer, paddingHorizontal: margins.xs - 4, marginBottom: margins.sm }}
                    text={ lastLessonTitle }
                    textStyle={{ fontSize: fontSizes.md }}
                />

                {/* If the last lesson loading, show a loading indicator */}
                { (isLastLessonLoading) && (
                    <ActivityIndicator
                        color={ colors.button }
                        size={ fontSizes.xxl }
                        style={{ marginVertical: 63.75 }}
                        testID="last-lesson-loading"
                    />
                ) }

                {/* If the last lesson not loading and last lesson not found, show a message */}
                { (!isLastLessonLoading && !lastLesson?.id) && (
                    <InfoText
                        containerStyle={{ marginVertical: 63.75 }}
                        text={ translate('screens.preaching.messages.emptyLastLesson') }
                    />
                ) }

                { (!isLastLessonLoading && lastLesson?.id) && (
                    <LessonCard
                        lesson={ lastLesson }
                        onClick={ () => setSelectedCourse(lastLesson.course) }
                        onDelete={ () => handleShowLessonModal(lastLesson, '/(app)/(tabs)/preaching/publisher/delete-lesson-modal') }
                        onFinish={ () => handleShowLessonModal(lastLesson, '/(app)/(tabs)/preaching/publisher/finish-or-start-lesson-modal') }
                        onNavigateDetail={ () => router.navigate('/(app)/(tabs)/preaching/publisher/lesson-detail') }
                        onNavigateEdit={ () => router.navigate('/(app)/(tabs)/preaching/publisher/add-or-edit-lesson') }
                    />
                ) }

                <Title
                    containerStyle={{ ...themeStyles.titleContainer, paddingTop: margins.lg, paddingHorizontal: margins.xs - 4, marginBottom: margins.sm }}
                    text={ lastRevisitTitle }
                    textStyle={{ fontSize: fontSizes.md }}
                />

                {/* If the last revisit loading, show a loading indicator */}
                { (isLastRevisitLoading) && (
                    <ActivityIndicator
                        color={ colors.button }
                        size={ fontSizes.xxl }
                        style={{ marginVertical: 63.75 }}
                        testID="last-revisit-loading"
                    />
                ) }

                {/* If the last revisit not loading and last revisit not found, show a message */}
                { (!isLastRevisitLoading && !lastRevisit?.id) && (
                    <InfoText
                        containerStyle={{ marginVertical: 63.75 }}
                        text={ translate('screens.preaching.messages.emptyLastRevisit') }
                    />
                ) }

                { (!isLastRevisitLoading && lastRevisit?.id) && (
                    <RevisitCard
                        onDelete={ () => handleShowRevisitModal(lastRevisit, '/(app)/(tabs)/preaching/publisher/delete-revisit-modal') }
                        onNavigateDetail={ () => router.navigate('/(app)/(tabs)/preaching/publisher/revisit-detail') }
                        onNavigateEdit={ () => router.navigate('/(app)/(tabs)/preaching/publisher/add-or-edit-revisit') }
                        onPass={ () => handleShowRevisitModal(lastRevisit, '/(app)/(tabs)/preaching/publisher/pass-to-course-modal') }
                        onRevisit={ () => handleShowRevisitModal(lastRevisit, '/(app)/(tabs)/preaching/publisher/revisit-modal') }
                        revisit={ lastRevisit }
                    />
                ) }
            </ScrollView>

            <Fab
                color={ colors.button }
                icon={
                    <Ionicons
                        color={ colors.contentHeader }
                        name="reader-outline"
                        size={ fontSizes.xl }
                    />
                }
                onPress={ () => router.navigate('/(app)/(tabs)/preaching/publisher/report-modal') }
                style={ themeStyles.fabBottomRight }
                touchColor="rgba(0, 0, 0, 0.15)"
            />
        </>
    );
}

export default PublisherHome;
