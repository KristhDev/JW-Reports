import { useState } from 'react';
import { Href, Stack, useRouter } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

/* Modules */
import { useCourses } from '@courses';
import { useLessons } from '@lessons';
import { Header, HeaderButtons } from '@ui';

export default function CoursesLayout(): JSX.Element {
    const [ showDeleteCourseModal, setShowDeleteCourseModal ] = useState<boolean>(false);
    const [ showDeleteLessonModal, setShowDeleteLessonModal ] = useState<boolean>(false);

    const router = useRouter();
    const { theme: { colors } } = useStyles();

    const { state: { isCourseDeleting, selectedCourse }, deleteCourse } = useCourses();
    const { state: { selectedLesson, isLessonDeleting }, deleteLesson } = useLessons();

    const courseDetailTitle = `Curso a ${ selectedCourse.personName }`;

    /**
     * When the user clicks the delete button, the deleteCourse function is called, which sets the
     * showDeleteCourseModal state to false.
     *
     * @return {void} This function does not return anything
     */
    const handleDeleteCourse = (onSuccess?: () => void): void => {
        deleteCourse({
            onFinish: () => setShowDeleteCourseModal(false),
            onSuccess
        });
    }

    /**
     * When the user clicks the delete button, show the delete modal, and when the user clicks the
     * delete button in the modal, delete the lesson.
     *
     * @return {void} This function does not return anything
     */
    const handleDeleteLesson = (onSuccess?: () => void): void => {
        deleteLesson({
            onFinish: () => setShowDeleteLessonModal(false),
            onSuccess
        });
    }

    /**
     * Navigate to the route specified by the href parameter.
     *
     * @param {Href} href - The route to navigate to.
     *
     * @return {void} This function does not return anything
     */
    const handleGoTo = (href: Href): void => {
        router.navigate(href);
    }

    /**
     * Dismiss to the route specified by the href parameter.
     *
     * @param {Href} href - The route to dismiss to.
     *
     * @return {void} This function does not return anything
     */
    const handleDismissTo = (href: Href): void => {
        router.dismissTo(href);
    }

    /**
     * Go back to the previous screen in the navigation stack.
     *
     * @return {void} This function does not return anything
     */
    const handleGoBack = (): void => {
        router.back();
    }

    return (
        <Stack
            screenOptions={{
                animation: 'ios_from_right',
                contentStyle: { backgroundColor: colors.contentHeader },
                headerShadowVisible: false,
                headerStyle: { backgroundColor: colors.header },
                headerTintColor: colors.headerText
            }}
        >
            <Stack.Screen
                name="(tabs)"
                options={{ title: 'Cursos' }}
            />

            <Stack.Screen
                name="detail"
                options={{
                    header: ({ options }) => (
                        <Header
                            showBackButton
                            showTitle
                            style={{ justifyContent: 'space-between' }}
                            title={ options.title }
                        >
                            <HeaderButtons
                                deleteButton={ true }
                                deleteModalText="¿Está seguro de eliminar este curso?"
                                isDeleteModalLoading={ isCourseDeleting }
                                onCloseDeleteModal={ () => setShowDeleteCourseModal(false) }
                                onConfirmDeleteModal={ () => handleDeleteCourse(handleGoBack) }
                                onShowDeleteModal={ () => setShowDeleteCourseModal(true) }
                                showDeleteModal={ showDeleteCourseModal }

                                editButton={ !selectedCourse.finished }
                                onPressEditButton={ () => handleGoTo('/(app)/(tabs)/courses/add-or-edit') }
                            />
                        </Header>
                    ),
                    title: courseDetailTitle
                }}
            />

            <Stack.Screen
                name="add-or-edit"
                options={{
                    header: ({ options }) => (
                        <Header
                            showBackButton
                            showTitle
                            style={{ justifyContent: 'space-between' }}
                            title={ options.title }
                        >
                            <HeaderButtons
                                deleteButton={ selectedCourse.id !== '' }
                                deleteModalText="¿Está seguro de eliminar este curso?"
                                isDeleteModalLoading={ isCourseDeleting }
                                onCloseDeleteModal={ () => setShowDeleteCourseModal(false) }
                                onConfirmDeleteModal={ () => handleDeleteCourse(() => handleDismissTo('/(app)/(tabs)/courses/(tabs)')) }
                                onShowDeleteModal={ () => setShowDeleteCourseModal(true) }
                                showDeleteModal={ showDeleteCourseModal }
                            />
                        </Header>
                    ),
                    title: `${ selectedCourse.id !== '' ? 'Editar' : 'Agregar' } curso`
                }}
            />

            <Stack.Screen
                name="add-or-edit-lesson"
                options={{
                    header: ({ options }) => (
                        <Header
                            showBackButton
                            showTitle
                            style={{ justifyContent: 'space-between' }}
                            title={ options.title }
                        >
                            <HeaderButtons
                                deleteButton={ selectedLesson.id !== '' }
                                deleteModalText="¿Está seguro de eliminar esta clase?"
                                isDeleteModalLoading={ isLessonDeleting }
                                onCloseDeleteModal={ () => setShowDeleteLessonModal(false) }
                                onConfirmDeleteModal={ () => handleDeleteLesson(() => handleDismissTo('/(app)/(tabs)/courses/lessons')) }
                                onShowDeleteModal={ () => setShowDeleteLessonModal(true) }
                                showDeleteModal={ showDeleteLessonModal }
                            />
                        </Header>
                    ),
                    title: `${ selectedLesson.id !== '' ? 'Editar' : 'Agregar' } clase`
                }}
            />

            <Stack.Screen
                name="lessons"
                options={{
                    header: ({ options }) => (
                        <Header
                            showBackButton
                            showTitle
                            title={ options.title }
                        />
                    ),
                    title: 'Clases'
                }}
            />

            <Stack.Screen
                name="lesson-detail"
                options={{
                    header: ({ options }) => (
                        <Header
                            showBackButton
                            showTitle
                            style={{ justifyContent: 'space-between' }}
                            title={ options.title }
                        >
                            <HeaderButtons
                                deleteButton={ true }
                                deleteModalText="¿Está seguro de eliminar esta clase?"
                                isDeleteModalLoading={ isLessonDeleting }
                                onCloseDeleteModal={ () => setShowDeleteLessonModal(false) }
                                onConfirmDeleteModal={ () => handleDeleteLesson(handleGoBack) }
                                onShowDeleteModal={ () => setShowDeleteLessonModal(true) }
                                showDeleteModal={ showDeleteLessonModal }
    
                                editButton={ !selectedCourse.finished || !selectedCourse.suspended }
                                onPressEditButton={ () => handleGoTo('/(app)/(tabs)/courses/add-or-edit-lesson') }
                            />
                        </Header>
                    ),
                    title: `Clase con ${ selectedCourse.personName }`
                }}
            />
        </Stack>
    );
}