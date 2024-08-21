import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import Icon from 'react-native-vector-icons/Ionicons';

/* Modules */
import { useCourses, PassToCourseModal } from '../../../courses';
import { FinishOrStartLessonModal, INIT_LESSON, LessonCard, LessonWithCourse, useLessons } from '../../../lessons';
import { INIT_REVISIT, RevisitCard, Revisit, RevisitModal, useRevisits } from '../../../revisits';

/* Components */
import { ReportModal } from '../ReportModal';
import { DeleteModal, Fab, InfoText, Title } from '../../../ui';

/* Hooks */
import { usePreaching } from '../../hooks';

/* Utils */
import { date } from '../../../../utils';

/* Theme */
import { themeStylesheet } from '../../../theme';

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

    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const { state: { selectedDate } } = usePreaching();

    const { setSelectedCourse } = useCourses();
    const {
        state: {
            isLastLessonLoading,
            isLessonDeleting,
            lastLesson
        },
        deleteLesson,
        loadLastLesson,
        setSelectedLesson
    } = useLessons();

    const {
        state: {
            isLastRevisitLoading,
            isRevisitDeleting,
            lastRevisit
        },
        setSelectedRevisit,
        loadLastRevisit
    } = useRevisits();

    const month = date.format(selectedDate, 'MMMM').toUpperCase();

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
                    containerStyle={{ ...themeStyles.titleContainer, marginBottom: margins.sm }}
                    text="ÚLTIMA LECCIÓN"
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
                    containerStyle={{ ...themeStyles.titleContainer, paddingTop: margins.lg, marginBottom: margins.sm }}
                    text="ÚLTIMA REVISITA"
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
                        text="No has agregado ninguna revisita."
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
                        size={ fontSizes.xl }
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
