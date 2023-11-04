import React, { useEffect, useState } from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

/* Screens */
import { AddOrEditPreaching, PrecursorHome, PublisherHome } from '../screens/preaching';
import { AddOrEditLesson, LessonDetail } from '../screens/courses';

/* Components */
import { BackButton, HeaderButtons } from '../components/ui';

/* Hooks */
import { useAuth, useCourses, useNetwork, usePreaching, useStatus, useTheme } from '../hooks';

/* Interfaces */
import { PreachingStackParamsList } from '../interfaces/preaching';

const Stack = createStackNavigator<PreachingStackParamsList>();

/**
 * This is a stack navigation for preaching.
 *
 * @return {JSX.Element} rendered component to show stack navigation of preaching
 */
const PreachingStackNavigation = (): JSX.Element => {
    const [ showDeleteLessonModal, setShowDeleteLessonModal ] = useState<boolean>(false);
    const [ showDeleteModal, setShowDeleteModal ] = useState<boolean>(false);
    const { navigate } = useNavigation();

    const { state: { user } } = useAuth();

    const {
        state: {
            isLessonDeleting,
            selectedCourse,
            selectedLesson
        },
        deleteLesson,
        loadCourses,
        loadLastLesson
    } = useCourses();

    const {
        state: {
            isPreachingDeleting,
            seletedPreaching,
            selectedDate
        },
        deletePreaching,
        setSelectedDate,
        loadPreachings
    } = usePreaching();
    const { state: { colors } } = useTheme();
    const { setNetworkError } = useStatus();
    const { isConnected } = useNetwork();

    /**
     * When the user clicks the delete button, show the delete modal, and when the user clicks the
     * delete button in the modal, delete the lesson.
     *
     * @return {void} This function does not return anything
     */
    const handleDeleteLesson = (): void => {
        deleteLesson(true, () => setShowDeleteLessonModal(false));
    }

    /**
     * If the user clicks the delete button, then show the delete modal, and if the user clicks the
     * confirm button, then delete the preaching.
     *
     * @return {void} This function does not return anything
     */
    const handleDeleteConfirm = (): void => {
        deletePreaching(() => setShowDeleteModal(false));
    }

    /**
     * Effect to select default date and load courses.
     */
    useEffect(() => {
        if (user.precursor !== 'ninguno') setSelectedDate(new Date());
        if (isConnected) loadCourses({ filter: 'all' });
    }, []);

    /**
     * Effect to load preachings of the selected date.
     */
    useEffect(() => {
        if (!isConnected) {
            setNetworkError();
            return;
        }

        if (user.precursor !== 'ninguno') loadPreachings(selectedDate);
        else {
            loadLastLesson();
        }
    } ,[ selectedDate ]);

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
                component={ (user.precursor !== 'ninguno') ? PrecursorHome : PublisherHome }
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
                component={ AddOrEditPreaching }
                name="AddOrEditPreachingScreen"
                options={{
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    headerRight: () => (
                        <HeaderButtons
                            changeMonthButton={ (user.precursor !== 'ninguno') }
                            deleteButton={ seletedPreaching.id !== '' }
                            deleteModalText="¿Está seguro de eliminar este día de predicación?"
                            isDeleteModalLoading={ isPreachingDeleting }
                            onCloseDeleteModal={ () => setShowDeleteModal(false) }
                            onConfirmDeleteModal={ handleDeleteConfirm }
                            onShowDeleteModal={ () => setShowDeleteModal(true) }
                            showDeleteModal={ showDeleteModal }
                        />
                    ),
                    title: `${ seletedPreaching.id !== '' ? 'Editar' : 'Agregar' } predicación`
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
                            onConfirmDeleteModal={ handleDeleteLesson }
                            onShowDeleteModal={ () => setShowDeleteLessonModal(true) }
                            showDeleteModal={ showDeleteLessonModal }
                        />
                    ),
                    title: `${ selectedLesson.id !== '' ? 'Editar' : 'Agregar' } clase`
                }}
            />

            <Stack.Screen
                component={ LessonDetail }
                name="HomeLessonDetailScreen"
                options={{
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    headerRight: () => (
                        <HeaderButtons
                            deleteButton={ true }
                            deleteModalText="¿Está seguro de eliminar esta clase?"
                            isDeleteModalLoading={ isLessonDeleting }
                            onCloseDeleteModal={ () => setShowDeleteLessonModal(false) }
                            onConfirmDeleteModal={ handleDeleteLesson }
                            onShowDeleteModal={ () => setShowDeleteLessonModal(true) }
                            showDeleteModal={ showDeleteLessonModal }

                            editButton={ !selectedCourse.finished || !selectedCourse.suspended }
                            onPressEditButton={ () => navigate({ name: 'PreachingStackNavigation', params: { screen: 'AddOrEditLessonScreen' } } as never) }
                        />
                    ),
                    title: `Clase con ${ selectedCourse.person_name }`
                }}
            />
        </Stack.Navigator>
    );
}

export default PreachingStackNavigation;