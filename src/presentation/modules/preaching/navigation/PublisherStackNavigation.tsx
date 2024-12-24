import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { useStyles } from 'react-native-unistyles';

/* Modules */
import { useCourses } from '@courses';
import { AddOrEditLesson, LessonDetail, useLessons } from '@lessons';
import { AddOrEditRevisit, RevisitDetail, useRevisits } from '@revisits';
import { PublisherHome, PublisherStackParamsList } from '@preaching';
import { useNetwork, useStatus } from '@shared';
import { BackButton, HeaderButtons, PreachingStackNavigationType } from '@ui';

const Stack = createStackNavigator<PublisherStackParamsList>();

/**
 * This is a stack navigation for the publisher, providing navigation
 * between various screens related to lessons and revisits. It manages
 * the display and handling of delete modals for lessons and revisits,
 * and handles navigation logic within the stack.
 *
 * @return {JSX.Element} rendered component to show stack navigation
 * of publisher.
 */
const PublisherStackNavigation = (): JSX.Element => {
    const [ showDeleteLessonModal, setShowDeleteLessonModal ] = useState<boolean>(false);
    const [ showDeleteRevisitModal, setShowDeleteRevisitModal ] = useState<boolean>(false);

    const navigation = useNavigation<PreachingStackNavigationType>();
    const { theme: { colors } } = useStyles();

    const { state: { selectedCourse } } = useCourses();
    const { state: { isRevisitDeleting, selectedRevisit }, deleteRevisit, loadLastRevisit } = useRevisits();
    const { state: { isLessonDeleting, selectedLesson }, deleteLesson, loadLastLesson } = useLessons();
    const { setNetworkError } = useStatus();
    const { wifi } = useNetwork();

    const revisitDetailTitle = `Revisita ${ selectedRevisit.personName }`;

    /**
     * Navigates to the given screen inside the PublisherStackNavigation stack.
     *
     * @param {keyof PublisherStackParamsList} screen - The name of the screen to navigate to.
     * @return {void} This function does not return any value.
     */
    const handleGoTo = (screen: keyof PublisherStackParamsList): void => {
        navigation.navigate('PublisherStackNavigation', { screen } as any);
    }

    /**
     * Navigates to the given screen inside the PublisherStackNavigation stack, and discards all the
     * screens that are above the given screen.
     *
     * @param {keyof PublisherStackParamsList} screen - The name of the screen to navigate to.
     * @return {void} This function does not return anything.
     */
    const handlePopTo = (screen: keyof PublisherStackParamsList): void => {
        navigation.popTo('PublisherStackNavigation', { screen } as any);
    }

    /**
     * Handles the deletion of a lesson by showing a delete modal and executing the provided
     * onSuccess callback if the deletion is successful.
     *
     * @param {() => void} [onSuccess] - Optional callback to execute upon successful deletion.
     * @return {void} This function does not return any value.
     */
    const handleDeleteLesson = (onSuccess?: () => void): void => {
        deleteLesson({
            onFinish: () => setShowDeleteLessonModal(false),
            onSuccess
        });
    }

    /**
     * If the user clicks the delete button, then show the delete modal, and if the user clicks the
     * confirm button, then delete the preaching.
     *
     * @return {void} This function does not return anything
     */
    const handleDeleteRevisit = (onSuccess?: () => void): void => {
        deleteRevisit({
            onFinish: () => setShowDeleteRevisitModal(false),
            onSuccess
        });
    }

    useEffect(() => {
        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }

        loadLastLesson();
        loadLastRevisit();
    } ,[]);

    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                cardStyle: {
                    backgroundColor: colors.background,
                },
                headerStyle: {
                    backgroundColor: colors.header
                },
                headerTintColor: colors.headerText,
                headerShadowVisible: false
            }}
        >
            <Stack.Screen
                component={ PublisherHome }
                name="HomeScreen"
                options={{
                    headerRight: () => (
                        <HeaderButtons
                            logoutButton
                            changeMonthButton
                            settingsButtons
                        />
                    ),
                    title: 'Inicio'
                }}
            />

            <Stack.Screen
                component={ AddOrEditLesson }
                name="AddOrEditLessonScreen"
                options={{
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    headerRight: () => (
                        <HeaderButtons
                            deleteButton={ selectedLesson.id !== '' }
                            deleteModalText="¿Está seguro de eliminar esta clase?"
                            isDeleteModalLoading={ isLessonDeleting }
                            onCloseDeleteModal={ () => setShowDeleteLessonModal(false) }
                            onConfirmDeleteModal={ () => handleDeleteLesson(() => handlePopTo('HomeScreen')) }
                            onShowDeleteModal={ () => setShowDeleteLessonModal(true) }
                            showDeleteModal={ showDeleteLessonModal }
                        />
                    ),
                    title: `${ selectedLesson.id !== '' ? 'Editar' : 'Agregar' } clase`
                }}
            />

            <Stack.Screen
                component={ LessonDetail }
                name="LessonDetailScreen"
                options={{
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    headerRight: () => (
                        <HeaderButtons
                            deleteButton={ true }
                            deleteModalText="¿Está seguro de eliminar esta clase?"
                            isDeleteModalLoading={ isLessonDeleting }
                            onCloseDeleteModal={ () => setShowDeleteLessonModal(false) }
                            onConfirmDeleteModal={ () => handleDeleteLesson(() => handlePopTo('HomeScreen')) }
                            onShowDeleteModal={ () => setShowDeleteLessonModal(true) }
                            showDeleteModal={ showDeleteLessonModal }

                            editButton={ !selectedCourse.finished || !selectedCourse.suspended }
                            onPressEditButton={ () => handleGoTo('AddOrEditLessonScreen') }
                        />
                    ),
                    title: `Clase con ${ selectedCourse.personName }`
                }}
            />

            <Stack.Screen
                component={ AddOrEditRevisit }
                name="AddOrEditRevisitScreen"
                options={{
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    headerRight: () => (
                        <HeaderButtons
                            deleteButton={ selectedRevisit.id !== '' }
                            deleteModalText="¿Está seguro de eliminar esta revisita?"
                            isDeleteModalLoading={ isRevisitDeleting }
                            onCloseDeleteModal={ () => setShowDeleteRevisitModal(false) }
                            onConfirmDeleteModal={ () => handleDeleteRevisit(() => handlePopTo('HomeScreen')) }
                            onShowDeleteModal={ () => setShowDeleteRevisitModal(true) }
                            showDeleteModal={ showDeleteRevisitModal }

                            editButton={ false }
                        />
                    ),
                    title: `${ selectedRevisit.id !== '' ? 'Editar' : 'Agregar' } revisita`
                }}
            />

            <Stack.Screen
                component={ RevisitDetail }
                name="RevisitDetailScreen"
                options={{
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    headerRight: () => (
                        <HeaderButtons
                            deleteButton={ true }
                            deleteModalText="¿Está seguro de eliminar esta revisita?"
                            isDeleteModalLoading={ isRevisitDeleting }
                            onCloseDeleteModal={ () => setShowDeleteRevisitModal(false) }
                            onConfirmDeleteModal={ () => handleDeleteRevisit(() => handlePopTo('HomeScreen')) }
                            onShowDeleteModal={ () => setShowDeleteRevisitModal(true) }
                            showDeleteModal={ showDeleteRevisitModal }

                            editButton={ true }
                            onPressEditButton={ () => handleGoTo('AddOrEditRevisitScreen') }
                        />
                    ),
                    headerTitleContainerStyle: { flexGrow: 1 },
                    headerTitleStyle: { maxWidth: '80%' },
                    title: revisitDetailTitle
                }}
            />
        </Stack.Navigator>
    );
}

export default PublisherStackNavigation;