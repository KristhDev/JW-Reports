import { useEffect, useState } from 'react';
import { Redirect, Stack, useRouter } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

/* Constants */
import { precursors } from '@application/constants';

/* Modules */
import { useAuth } from '@auth';
import { useCourses } from '@courses';
import { useLessons } from '@lessons';
import { useRevisits } from '@revisits';
import { useNetwork, useStatus } from '@shared';
import { Header, HeaderButtons } from '@ui';

/* Utils */
import { Characters } from '@utils';

export default function PublisherLayout(): JSX.Element {
    const [ showDeleteLessonModal, setShowDeleteLessonModal ] = useState<boolean>(false);
    const [ showDeleteRevisitModal, setShowDeleteRevisitModal ] = useState<boolean>(false);

    const router = useRouter();
    const { theme: { colors } } = useStyles();

    const { state: { user } } = useAuth();
    const { state: { selectedCourse } } = useCourses();
    const { state: { isLessonDeleting, selectedLesson }, deleteLesson, loadLastLesson } = useLessons();
    const { state: { isRevisitDeleting, selectedRevisit }, deleteRevisit, loadLastRevisit } = useRevisits();
    const { wifi } = useNetwork();
    const { setNetworkError } = useStatus();

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
     * When the user clicks the delete button, show the delete modal, and when the user clicks the
     * delete button in the modal, delete the revisit.
     *
     * @return {void} This function does not return anything
     */
    const handleDeleteRevisit = (): void => {
        deleteRevisit(true, () => setShowDeleteRevisitModal(false));
    }

    useEffect(() => {
        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }

        loadLastLesson();
        loadLastRevisit();
    }, []);

    if (user.precursor !== precursors.NINGUNO) return (<Redirect href="/(app)/(tabs)/preaching/precursor" />);

    return (
        <Stack
            screenOptions={{
                animation: 'ios_from_right',
                contentStyle: { backgroundColor: colors.background },
                headerShadowVisible: false,
                headerStyle: { backgroundColor: colors.header },
                headerTintColor: colors.headerText
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    header: ({ options }) => (
                        <Header
                            showTitle
                            style={{ justifyContent: 'space-between' }}
                            title={ options.title }
                        >
                            <HeaderButtons
                                logoutButton
                                changeMonthButton
                                settingsButtons
                            />
                        </Header>
                    ),
                    title: 'Inicio'
                }}
            />

            <Stack.Screen
                name="add-or-edit-lesson"
                options={{
                    header: ({ options }) => (
                        <Header
                            showTitle
                            style={{ justifyContent: 'space-between' }}
                            title={ options.title }
                        >
                            <HeaderButtons
                                deleteButton={ selectedLesson.id !== '' }
                                deleteModalText="¿Está seguro de eliminar esta clase?"
                                isDeleteModalLoading={ isLessonDeleting }
                                onCloseDeleteModal={ () => setShowDeleteLessonModal(false) }
                                onConfirmDeleteModal={ handleDeleteLesson }
                                onShowDeleteModal={ () => setShowDeleteLessonModal(true) }
                                showDeleteModal={ showDeleteLessonModal }
                            />
                        </Header>
                    ),
                    title: `${ selectedLesson.id !== '' ? 'Editar' : 'Agregar' } clase`
                }}
            />

            <Stack.Screen
                name="lesson-detail"
                options={{
                    header: ({ options }) => (
                        <Header
                            showTitle
                            style={{ justifyContent: 'space-between' }}
                            title={ options.title }
                        >
                            <HeaderButtons
                                deleteButton={ true }
                                deleteModalText="¿Está seguro de eliminar esta clase?"
                                isDeleteModalLoading={ isLessonDeleting }
                                onCloseDeleteModal={ () => setShowDeleteLessonModal(false) }
                                onConfirmDeleteModal={ handleDeleteLesson }
                                onShowDeleteModal={ () => setShowDeleteLessonModal(true) }
                                showDeleteModal={ showDeleteLessonModal }

                                editButton={ !selectedCourse.finished || !selectedCourse.suspended }
                                onPressEditButton={ () => router.navigate('/(app)/(tabs)/preaching/publisher/add-or-edit-lesson') }
                            />
                        </Header>
                    ),
                    title: `Clase con ${ selectedCourse.personName }`
                }}
            />

            <Stack.Screen
                name="add-or-edit-revisit"
                options={{
                    header: ({ options }) => (
                        <Header
                            showTitle
                            style={{ justifyContent: 'space-between' }}
                            title={ options.title }
                        >
                            <HeaderButtons
                                deleteButton={ selectedRevisit.id !== '' }
                                deleteModalText="¿Está seguro de eliminar esta revisita?"
                                editButton={ false }
                                isDeleteModalLoading={ isRevisitDeleting }
                                onCloseDeleteModal={ () => setShowDeleteRevisitModal(false) }
                                onConfirmDeleteModal={ handleDeleteRevisit }
                                onShowDeleteModal={ () => setShowDeleteRevisitModal(true) }
                                showDeleteModal={ showDeleteRevisitModal }
                            />
                        </Header>
                    ),
                    title: `${ selectedRevisit.id !== '' ? 'Editar' : 'Agregar' } revisita`
                }}
            />

            <Stack.Screen
                name="revisit-detail"
                options={{
                    header: ({ options }) => (
                        <Header
                            showTitle
                            style={{ justifyContent: 'space-between' }}
                            title={ options.title }
                        >
                            <HeaderButtons
                                deleteButton={ true }
                                deleteModalText="¿Está seguro de eliminar esta revisita?"
                                isDeleteModalLoading={ isRevisitDeleting }
                                onCloseDeleteModal={ () => setShowDeleteRevisitModal(false) }
                                onConfirmDeleteModal={ handleDeleteRevisit }
                                onShowDeleteModal={ () => setShowDeleteRevisitModal(true) }
                                showDeleteModal={ showDeleteRevisitModal }

                                editButton={ true }
                                onPressEditButton={ () => router.navigate('/(app)/(tabs)/preaching/publisher/add-or-edit-revisit') }
                            />
                        </Header>
                    ),
                    title: Characters.truncate(`Revisita ${ selectedRevisit.personName }`, 22)
                }}
            />
        </Stack>
    );
}