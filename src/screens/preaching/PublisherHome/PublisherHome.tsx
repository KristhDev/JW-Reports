import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';

/* Features */
import { INIT_REVISIT, INIT_LESSON } from '../../../features';

/* Screens */
import { ReportModal } from '../ReportModal';
import { FinishOrStartLessonModal, PassToCourseModal } from '../../courses';
import { RevisitModal } from '../../revisits';
import { DeleteModal } from '../../ui';

/* Components */
import { LessonCard } from '../../../components/courses';
import { RevisitCard } from '../../../components/revisits';
import { Fab, InfoText, Title } from '../../../components/ui';

/* Hooks */
import { useCourses, usePreaching, useRevisits, useTheme } from '../../../hooks';

/* Interfaces */
import { LessonWithCourse, Revisit } from '../../../interfaces';

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
    const [ showDeleteLessonModal, setShowDeleteLessonModal ] = useState<boolean>(false);
    const [ showDeleteRevisitModal, setShowDeleteRevisitModal ] = useState<boolean>(false);
    const [ showFSModal, setShowFSModal ] = useState<boolean>(false);
    const [ showPassModal, setShowPassModal ] = useState<boolean>(false);
    const [ showReportModal, setShowReportModal ] = useState<boolean>(false);
    const [ showRevisitModal, setShowRevisitModal ] = useState<boolean>(false);

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

    const {
        state: {
            isLastRevisitLoading,
            isRevisitDeleting,
            lastRevisit
        },
        setSelectedRevisit,
        loadLastRevisit
    } = useRevisits();

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
        loadLastRevisit();
    }

    /**
     * Handles showing the revisits modal.
     *
     * @param {Revisit} revisit - The revisit object.
     * @param {(value: boolean) => void} setShowModal - The function to set the showModal value.
     * @return {void} This function does not return anything.
     */
    const handleShowRevisitsModal = (revisit: Revisit, setShowModal: (value: boolean) => void): void => {
        setSelectedRevisit(revisit);
        setShowModal(true);
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
     * Handles hiding the revisit modal and resetting the selected revisit state.
     *
     * @param {function} setShowModal - A function to set the visibility of the modal.
     * @return {void} This function does not return anything.
     */
    const handleHideRevisitsModal = (setShowModal: (value: boolean) => void): void => {
        setShowModal(false);
        setSelectedRevisit({
            ...INIT_REVISIT,
            nextVisit: new Date().toString()
        });
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
            nextLesson: new Date().toString()
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

                {/* If the last lesson loading, show a loading indicator */}
                { (isLastLessonLoading) && (
                    <ActivityIndicator
                        color={ colors.button }
                        size={ 50 }
                        style={{ marginBottom: 63.75, marginTop: 63.75 }}
                        testID="last-lesson-loading"
                    />
                ) }

                {/* If the last lesson not loading and last lesson not found, show a message */}
                { (!isLastLessonLoading && !lastLesson?.id) && (
                    <InfoText
                        containerStyle={{ marginBottom: 63.75, marginTop: 63.75 }}
                        text="No haz agregado ninguna lección para un curso biblíco."
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
                    containerStyle={{ ...themeStyles.titleContainer, paddingTop: 32, marginBottom: 16 }}
                    text="ÚLTIMA REVISITA"
                    textStyle={{ fontSize: 24 }}
                />

                {/* If the last revisit loading, show a loading indicator */}
                { (isLastRevisitLoading) && (
                    <ActivityIndicator
                        color={ colors.button }
                        size={ 50 }
                        style={{ marginBottom: 63.75, marginTop: 63.75 }}
                        testID="last-revisit-loading"
                    />
                ) }

                {/* If the last revisit not loading and last revisit not found, show a message */}
                { (!isLastRevisitLoading && !lastRevisit?.id) && (
                    <InfoText
                        containerStyle={{ marginBottom: 63.75, marginTop: 63.75 }}
                        text="No haz agregado ninguna revisita."
                    />
                ) }

                { (!isLastRevisitLoading && lastRevisit?.id) && (
                    <RevisitCard
                        onDelete={ () => handleShowRevisitsModal(lastRevisit, setShowDeleteRevisitModal) }
                        onPass={ () => handleShowRevisitsModal(lastRevisit, setShowPassModal) }
                        onRevisit={ () => handleShowRevisitsModal(lastRevisit, setShowRevisitModal) }
                        revisit={ lastRevisit }
                        screenToNavigate="HomeRevisitDetailScreen"
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

            {/* Modal to complete revisit */}
            <RevisitModal
                isOpen={ showRevisitModal }
                onClose={ () => handleHideRevisitsModal(setShowRevisitModal) }
            />

            {/* Modal for pass revisit to course */}
            <PassToCourseModal
                isOpen={ showPassModal }
                onClose={ () => handleHideRevisitsModal(setShowPassModal) }
            />

            {/* Modal to delete revisit */}
            <DeleteModal
                isLoading={ isRevisitDeleting }
                isOpen={ showDeleteRevisitModal }
                onClose={ () => handleHideRevisitsModal(setShowDeleteRevisitModal) }
                onConfirm={ handleDeleteConfirm }
                text="¿Está seguro de eliminar esta revisita?"
            />
        </>
    );
}

export default PublisherHome;
