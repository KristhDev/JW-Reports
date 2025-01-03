import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStyles } from 'react-native-unistyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* Features */
import { INIT_LESSON, INIT_REVISIT } from '@application/features';

/* Entities */
import { LessonWithCourseEntity, RevisitEntity } from '@domain/entities';

/* Adapters */
import { Time } from '@infrasturcture/adapters';

/* Modules */
import { useCourses, PassToCourseModal } from '@courses';
import { FinishOrStartLessonModal, LessonCard, useLessons } from '@lessons';
import { RevisitCard, RevisitModal, useRevisits } from '@revisits';

/* Components */
import { ReportModal } from '../ReportModal';
import { DeleteModal, Fab, InfoText, PublisherStackNavigationType, Title } from '@ui';

/* Hooks */
import { usePreaching } from '../../hooks';

/* Theme */
import { themeStylesheet } from '@theme';

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

    const navigation = useNavigation<PublisherStackNavigationType>();
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
        deleteRevisit,
        setSelectedRevisit,
        loadLastRevisit
    } = useRevisits();

    const month = Time.format(selectedDate, 'MMMM').toUpperCase();

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

    /**
     * Handles showing the revisits modal.
     *
     * @param {RevisitEntity} revisit - The revisit object.
     * @param {(value: boolean) => void} setShowModal - The function to set the showModal value.
     * @return {void} This function does not return anything.
     */
    const handleShowRevisitsModal = (revisit: RevisitEntity, setShowModal: (value: boolean) => void): void => {
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
    const handleShowLessonsModal = (lesson: LessonWithCourseEntity, setShowModal: (value: boolean) => void): void => {
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
     * Handles the deletion of a lesson by calling the deleteLesson function with a callback to
     * hide the delete modal after the deletion is complete.
     *
     * @return {void} This function does not return anything.
     */
    const handleDeleteLessonConfirm = (): void => {
        deleteLesson({
            onFinish: () => setShowDeleteLessonModal(false)
        });
    }

    /**
     * Handles the deletion of a revisit by calling the deleteRevisit function with a callback to
     * hide the delete modal after the deletion is complete.
     *
     * @return {void} This function does not return anything.
     */
    const handleDeleteRevisitConfirm = (): void => {
        deleteRevisit({
            onFinish: () => setShowDeleteRevisitModal(false)
        });
    }

    return (
        <>
            <ScrollView
                contentContainerStyle={{ alignItems: 'center', paddingHorizontal: margins.xs, paddingTop: margins.md, paddingBottom: 100 }}
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
                    containerStyle={{ ...themeStyles.titleContainer, paddingHorizontal: margins.sm, marginBottom: margins.sm }}
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
                        lesson={ lastLesson }
                        navigateToDetail={ () => navigation.navigate('LessonDetailScreen') }
                        navigateToEdit={ () => navigation.navigate('AddOrEditLessonScreen') }
                        onClick={ () => setSelectedCourse(lastLesson.course) }
                        onDelete={ () => handleShowLessonsModal(lastLesson, setShowDeleteLessonModal) }
                        onFinish={ () => handleShowLessonsModal(lastLesson, setShowFSModal) }
                    />
                ) }

                <Title
                    containerStyle={{ ...themeStyles.titleContainer, paddingTop: margins.lg, paddingHorizontal: margins.sm, marginBottom: margins.sm }}
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
                        navigateToDetail={ () => navigation.navigate('RevisitDetailScreen') }
                        navigateToEdit={ () => navigation.navigate('AddOrEditRevisitScreen') }
                        onDelete={ () => handleShowRevisitsModal(lastRevisit, setShowDeleteRevisitModal) }
                        onPass={ () => handleShowRevisitsModal(lastRevisit, setShowPassModal) }
                        onRevisit={ () => handleShowRevisitsModal(lastRevisit, setShowRevisitModal) }
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
                onConfirm={ handleDeleteLessonConfirm }
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
                onConfirm={ handleDeleteRevisitConfirm }
                text="¿Está seguro de eliminar esta revisita?"
            />
        </>
    );
}

export default PublisherHome;
