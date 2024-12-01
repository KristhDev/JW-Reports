import { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

/* Modules */
import { useCourses } from '@courses';
import { useLessons } from '@lessons';
import { Header, HeaderButtons } from '@ui';

/* Utils */
import { Characters } from '@utils';

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
    const handleDeleteCourse = (): void => {
        deleteCourse(true, () => setShowDeleteCourseModal(false));
    }

    /**
     * When the user clicks the delete button, show the delete modal, and when the user clicks the
     * delete button in the modal, delete the lesson.
     *
     * @return {void} This function does not return anything
     */
    const handleDeleteLesson = (): void => {
        deleteLesson(true, () => setShowDeleteLessonModal(false));
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
                                onConfirmDeleteModal={ handleDeleteCourse }
                                onShowDeleteModal={ () => setShowDeleteCourseModal(true) }
                                showDeleteModal={ showDeleteCourseModal }

                                editButton={ !selectedCourse.finished }
                                onPressEditButton={ () => router.navigate('/(app)/(tabs)/courses/add-or-edit') }
                            />
                        </Header>
                    ),
                    title: Characters.truncate(courseDetailTitle, 22)
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
                                onConfirmDeleteModal={ handleDeleteCourse }
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
                                onConfirmDeleteModal={ handleDeleteLesson }
                                onShowDeleteModal={ () => setShowDeleteLessonModal(true) }
                                showDeleteModal={ showDeleteLessonModal }
    
                                editButton={ !selectedCourse.finished || !selectedCourse.suspended }
                                onPressEditButton={ () => router.navigate('/(app)/(tabs)/courses/add-or-edit-lesson') }
                            />
                        </Header>
                    ),
                    title: Characters.truncate(courseDetailTitle, 22)
                }}
            />
        </Stack>
    );
}