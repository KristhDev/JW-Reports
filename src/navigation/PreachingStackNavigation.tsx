import React, { useEffect, useState } from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

/* Screens */
import { AddOrEditLesson, LessonDetail } from '../screens/courses';
import { AddOrEditRevisit, RevisitDetail } from '../screens/revisits';
import { AddOrEditPreaching, PrecursorHome, PublisherHome } from '../screens/preaching';

/* Components */
import { BackButton, HeaderButtons } from '../components/ui';

/* Hooks */
import { useAuth, useCourses, useNetwork, usePreaching, useRevisits, useStatus, useTheme } from '../hooks';

/* Interfaces */
import { PreachingStackParamsList } from '../interfaces';

const Stack = createStackNavigator<PreachingStackParamsList>();

/**
 * This is a stack navigation for preaching.
 *
 * @return {JSX.Element} rendered component to show stack navigation of preaching
 */
const PreachingStackNavigation = (): JSX.Element => {
    const [ showDeleteLessonModal, setShowDeleteLessonModal ] = useState<boolean>(false);
    const [ showDeleteRevisitModal, setShowDeleteRevisitModal ] = useState<boolean>(false);
    const [ showDeletePreachingModal, setShowDeletePreachingModal ] = useState<boolean>(false);
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

    const {
        state: {
            selectedRevisit,
            isRevisitDeleting,
        },
        loadLastRevisit
    } = useRevisits();

    const { state: { colors } } = useTheme();
    const { setNetworkError } = useStatus();
    const { wifi } = useNetwork();

    const revisitDetailTitle = `Revisita ${ selectedRevisit.personName }`;

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
        deletePreaching(() => setShowDeletePreachingModal(false));
    }

    /**
     * Effect to select default date and load courses.
     */
    useEffect(() => {
        if (user.precursor !== 'ninguno') setSelectedDate(new Date());
        if (wifi.isConnected) loadCourses({ filter: 'all' });
    }, []);

    /**
     * Effect to load preachings of the selected date.
     */
    useEffect(() => {
        if (!wifi.isConnected) {
            setNetworkError();
            return;
        }

        if (user.precursor !== 'ninguno') loadPreachings(selectedDate);
        else {
            loadLastLesson();
            loadLastRevisit();
        }
    } ,[ selectedDate, user.precursor ]);

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

            { (user.precursor !== 'ninguno') ? (
                <Stack.Screen
                    component={ AddOrEditPreaching }
                    name="AddOrEditPreachingScreen"
                    options={{
                        headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                        headerRight: () => (
                            <HeaderButtons
                                deleteButton={ seletedPreaching.id !== '' }
                                deleteModalText="¿Está seguro de eliminar este día de predicación?"
                                isDeleteModalLoading={ isPreachingDeleting }
                                onCloseDeleteModal={ () => setShowDeletePreachingModal(false) }
                                onConfirmDeleteModal={ handleDeleteConfirm }
                                onShowDeleteModal={ () => setShowDeletePreachingModal(true) }
                                showDeleteModal={ showDeletePreachingModal }
                            />
                        ),
                        title: `${ seletedPreaching.id !== '' ? 'Editar' : 'Agregar' } predicación`
                    }}
                />
            ) : (
                <>
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
                                    onConfirmDeleteModal={ handleDeleteConfirm }
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
                        name="HomeRevisitDetailScreen"
                        options={{
                            headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                            headerRight: () => (
                                <HeaderButtons
                                    deleteButton={ true }
                                    deleteModalText="¿Está seguro de eliminar esta revisita?"
                                    isDeleteModalLoading={ isRevisitDeleting }
                                    onCloseDeleteModal={ () => setShowDeleteRevisitModal(false) }
                                    onConfirmDeleteModal={ handleDeleteConfirm }
                                    onShowDeleteModal={ () => setShowDeleteRevisitModal(true) }
                                    showDeleteModal={ showDeleteRevisitModal }

                                    editButton={ true }
                                    onPressEditButton={ () => navigate({ name: 'PreachingStackNavigation', params: { screen: 'AddOrEditRevisitScreen' } } as never) }
                                />
                            ),
                            title: (revisitDetailTitle.length >= 22) ? revisitDetailTitle.slice(0, 22) + '...' : revisitDetailTitle
                        }}
                    />
                </>
            ) }
        </Stack.Navigator>
    );
}

export default PreachingStackNavigation;