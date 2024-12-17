import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { useStyles } from 'react-native-unistyles';

import { useCourses } from '@courses';
import { AddOrEditLesson, LessonDetail, useLessons } from '@lessons';
import { AddOrEditRevisit, RevisitDetail, useRevisits } from '@revisits';
import { PublisherHome, PublisherStackParamsList } from '@preaching';
import { useNetwork, useStatus } from '@shared';
import { BackButton, HeaderButtons } from '@ui';

import { Characters } from '@utils';

const Stack = createStackNavigator<PublisherStackParamsList>();

const PublisherStackNavigation = (): JSX.Element => {
    const [ showDeleteLessonModal, setShowDeleteLessonModal ] = useState<boolean>(false);
    const [ showDeleteRevisitModal, setShowDeleteRevisitModal ] = useState<boolean>(false);

    const navigation = useNavigation();
    const { theme: { colors, margins } } = useStyles();

    const { state: { selectedCourse } } = useCourses();
    const { state: { isRevisitDeleting, selectedRevisit }, deleteRevisit, loadLastRevisit } = useRevisits();
    const { state: { isLessonDeleting, selectedLesson }, deleteLesson, loadLastLesson } = useLessons();
    const { setNetworkError } = useStatus();
    const { wifi } = useNetwork();

    const revisitDetailTitle = `Revisita ${ selectedRevisit.personName }`;

    /**
     * Navigates to the given screen inside the PublisherStackNavigation stack.
     *
     * @param {string} screen - The name of the screen to navigate to.
     * @return {void} This function does not return any value.
     */
    const handleGoTo = (screen: string): void => {
        navigation.navigate({
            name: 'PublisherStackNavigation',
            params: { screen }
        } as never);
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
                    headerTitleStyle: { marginLeft: -margins.xs },
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    headerRight: () => (
                        <HeaderButtons
                            deleteButton={ selectedLesson.id !== '' }
                            deleteModalText="¿Está seguro de eliminar esta clase?"
                            isDeleteModalLoading={ isLessonDeleting }
                            onCloseDeleteModal={ () => setShowDeleteLessonModal(false) }
                            onConfirmDeleteModal={ () => handleDeleteLesson(() => handleGoTo('HomeScreen')) }
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
                    headerTitleStyle: { marginLeft: -margins.xs },
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    headerRight: () => (
                        <HeaderButtons
                            deleteButton={ true }
                            deleteModalText="¿Está seguro de eliminar esta clase?"
                            isDeleteModalLoading={ isLessonDeleting }
                            onCloseDeleteModal={ () => setShowDeleteLessonModal(false) }
                            onConfirmDeleteModal={ () => handleDeleteLesson(() => handleGoTo('HomeScreen')) }
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
                    headerTitleStyle: { marginLeft: -margins.xs },
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    headerRight: () => (
                        <HeaderButtons
                            deleteButton={ selectedRevisit.id !== '' }
                            deleteModalText="¿Está seguro de eliminar esta revisita?"
                            isDeleteModalLoading={ isRevisitDeleting }
                            onCloseDeleteModal={ () => setShowDeleteRevisitModal(false) }
                            onConfirmDeleteModal={ () => handleDeleteRevisit(() => handleGoTo('HomeScreen')) }
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
                    headerTitleStyle: { marginLeft: -margins.xs },
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    headerRight: () => (
                        <HeaderButtons
                            deleteButton={ true }
                            deleteModalText="¿Está seguro de eliminar esta revisita?"
                            isDeleteModalLoading={ isRevisitDeleting }
                            onCloseDeleteModal={ () => setShowDeleteRevisitModal(false) }
                            onConfirmDeleteModal={ () => handleDeleteRevisit(() => handleGoTo('HomeScreen')) }
                            onShowDeleteModal={ () => setShowDeleteRevisitModal(true) }
                            showDeleteModal={ showDeleteRevisitModal }

                            editButton={ true }
                            onPressEditButton={ () => handleGoTo('AddOrEditRevisitScreen') }
                        />
                    ),
                    title: Characters.truncate(revisitDetailTitle, 22)
                }}
            />
        </Stack.Navigator>
    );
}

export default PublisherStackNavigation;