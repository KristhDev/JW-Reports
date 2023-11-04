import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, useWindowDimensions, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';

/* Features */
import { INIT_LESSON } from '../../../features/courses/slice';

/* Screens */
import { ReportModal } from '../ReportModal';
import { FinishOrStartLessonModal } from '../../courses';
import { DeleteModal } from '../../ui';

/* Components */
import { LessonCard } from '../../../components/courses';
import { Fab, InfoText, Title } from '../../../components/ui';

/* Hooks */
import { useCourses, usePreaching, useTheme } from '../../../hooks';

/* Interfaces */
import { LessonWithCourse } from '../../../interfaces';

/* Theme */
import { styles as themeStyles } from '../../../theme';

/**
 * This screen is in charge of grouping the components to list the preaching days by
 * selectedDate, in addition to being the main screen that is shown to the
 * authenticated user.
 *
 * @return {JSX.Element} rendered component to show list of preaching days
 */
const PublisherHome = (): JSX.Element => {
    const [ isRefreshing, setIsRefreshing ] = useState<boolean>(false);
    const [ showReportModal, setShowReportModal ] = useState<boolean>(false);
    const [ showDeleteLessonModal, setShowDeleteLessonModal ] = useState<boolean>(false);
    const [ showFSModal, setShowFSModal ] = useState<boolean>(false);
    const { height } = useWindowDimensions();

    const { state: { selectedDate } } = usePreaching();

    const {
        state: {
            isLastLessonLoading,
            isLessonDeleting,
            lastLesson
        },
        deleteLesson,
        loadLastLesson,
        setSelectedCourse,
        setSelectedLesson
    } = useCourses();

    const { state: { colors } } = useTheme();

    const month = dayjs(selectedDate).format('MMMM').toUpperCase();

    /**
     * When the user swipes down to refresh, load the preachings for the selected date and set the
     * refreshing state to false.
     *
     * @return {void} This function does not return anything
     */
    const handleRefreshing = (): void => {
        setIsRefreshing(false);
        loadLastLesson();
    }

    /**
     * handleShowLessonsModals is a function that takes a lesson and a setShowModal function as parameters and
     * returns nothing.
     *
     * @param {Lesson} lesson - Lesson - this is the lesson that was clicked on
     * @param {(setShowModal: (value: boolean) => void)} setShowModal The function to set the modal visibility.
     * @return {void} This function does not return any value.
     */
    const handleShowLessonsModals = (lesson: LessonWithCourse, setShowModal: (value: boolean) => void): void => {
        const { course, ...rest } = lesson;
        setSelectedLesson(rest);
        setShowModal(true);
    }

    /**
     * handleHideLessonsModals is a function that takes a function as an argument and returns a function that
     * takes no arguments and returns nothing.
     *
     * @param {(setShowModal: (value: boolean) => void)} setShowModal The function to set the modal visibility.
     * @return {void} This function does not return any value.
     */
    const handleHideLessonsModals = (setShowModal: (value: boolean) => void): void => {
        setShowModal(false);
        setSelectedLesson({
            ...INIT_LESSON,
            next_lesson: new Date().toString()
        });
    }

    /**
     * Handles the delete confirmation by calling the deleteLesson function with a boolean value of false,
     * and then hides the delete modal by calling setShowDeleteModal with a boolean value of false.
     *
     * @return {void} - This function does not return any value.
     */
    const handleDeleteConfirm = (): void => {
        deleteLesson(false, () => setShowDeleteLessonModal(false));
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
                    containerStyle={{ ...themeStyles.titleContainer, marginBottom: 16 }}
                    text="ÚLTIMA LECCIÓN"
                    textStyle={{ fontSize: 24 }}
                />

                {/* If the preachings are loading, show a loading indicator */}
                { (isLastLessonLoading) && (
                    <ActivityIndicator
                        color={ colors.button }
                        size={ 50 }
                        style={{ marginBottom: 100, marginTop: 27.5 }}
                        testID="home-loading"
                    />
                ) }

                {/* If the preachings are not loading and there are no preachings, show a message */}
                { (!isLastLessonLoading && !lastLesson?.id) && (
                    <InfoText
                        containerStyle={{ marginTop: height * 0.30 }}
                        text="No has agregado ninguna lección para un curso biblíco."
                    />
                ) }

                { (!isLastLessonLoading && lastLesson?.id) && (
                    <LessonCard
                        screenToNavigate="HomeLessonDetailScreen"
                        lesson={ lastLesson }
                        onDelete={ () => handleShowLessonsModals(lastLesson, setShowDeleteLessonModal) }
                        onFinish={ () => handleShowLessonsModals(lastLesson, setShowFSModal) }
                        onClick={ () => setSelectedCourse(lastLesson.course) }
                    />
                ) }

                <Title
                    containerStyle={{ ...themeStyles.titleContainer, paddingTop: 32 }}
                    text="ÚLTIMA REVISITA"
                    textStyle={{ fontSize: 24 }}
                />
            </ScrollView>

            <Fab
                color={ colors.button }
                icon={
                    <Icon
                        color={ colors.contentHeader }
                        name="reader-outline"
                        size={ 40 }
                        style={{ marginBottom: 1 }}
                    />
                }
                onPress={ () => setShowReportModal(true) }
                style={ themeStyles.fabBottomRight }
                touchColor="rgba(0, 0, 0, 0.15)"
            />

            {/* Modal for show report */}
            <ReportModal
                isOpen={ showReportModal }
                month={ month.toLowerCase() }
                onClose={ () => setShowReportModal(false) }
            />

            {/* Modal to finish or start again lesson */}
            <FinishOrStartLessonModal
                isOpen={ showFSModal }
                onClose={ () => handleHideLessonsModals(setShowFSModal) }
            />

            {/* Modal to delete lesson */}
            <DeleteModal
                isLoading={ isLessonDeleting }
                isOpen={ showDeleteLessonModal }
                onClose={ () => handleHideLessonsModals(setShowDeleteLessonModal) }
                onConfirm={ handleDeleteConfirm }
                text="¿Está seguro de eliminar esta clase?"
            />
        </>
    );
}

export default PublisherHome;
