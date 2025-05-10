import { useState } from 'react';
import { Href, Stack, useRouter } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { Header, HeaderButtons } from '@ui/components';

/* Hooks */
import { useCourses } from '@courses/hooks';
import { useLessons } from '@lessons/hooks';
import { useTranslation } from '@ui/hooks';

export default function CoursesLayout(): JSX.Element {
    const [ showDeleteCourseModal, setShowDeleteCourseModal ] = useState<boolean>(false);
    const [ showDeleteLessonModal, setShowDeleteLessonModal ] = useState<boolean>(false);

    const router = useRouter();
    const { theme: { colors } } = useStyles();

    const { state: { isCourseDeleting, selectedCourse }, deleteCourse } = useCourses();
    const { state: { selectedLesson, isLessonDeleting }, deleteLesson } = useLessons();

    const { translate } = useTranslation();

    const courseDetailTitle = translate('navigation.titles.courseTo', {
        name: selectedCourse.personName
    });

    const addOrEditCourseTitleNavigation = translate('navigation.titles.course', {
        action: (selectedCourse.id !== '')
            ? translate('forms.actions.edit')
            : translate('forms.actions.add')
    });

    const addOrEditLessonTitleNavigation = translate('navigation.titles.lesson', {
        action: (selectedLesson.id !== '')
            ? translate('forms.actions.edit')
            : translate('forms.actions.add')
    });

    const lessonDetailTitleNavigation = translate('navigation.titles.lessonWith', {
        person: selectedCourse.personName
    });

    const deleteCourseModalTitle = translate('modals.titles.deleteAsk', {
        article: 'este',
        attribute: translate('entities.course')
    });

    const deleteLessonModalTitle = translate('modals.titles.deleteAsk', {
        article: 'esta',
        attribute: translate('entities.lesson')
    });

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
                options={{ title: translate('navigation.titles.courses') }}
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
                                deleteModalText={ deleteCourseModalTitle }
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
                                deleteModalText={ deleteCourseModalTitle }
                                isDeleteModalLoading={ isCourseDeleting }
                                onCloseDeleteModal={ () => setShowDeleteCourseModal(false) }
                                onConfirmDeleteModal={ () => handleDeleteCourse(() => handleDismissTo('/(app)/(tabs)/courses/(tabs)')) }
                                onShowDeleteModal={ () => setShowDeleteCourseModal(true) }
                                showDeleteModal={ showDeleteCourseModal }
                            />
                        </Header>
                    ),
                    title: addOrEditCourseTitleNavigation
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
                                deleteModalText={ deleteLessonModalTitle }
                                isDeleteModalLoading={ isLessonDeleting }
                                onCloseDeleteModal={ () => setShowDeleteLessonModal(false) }
                                onConfirmDeleteModal={ () => handleDeleteLesson(() => handleDismissTo('/(app)/(tabs)/courses/lessons')) }
                                onShowDeleteModal={ () => setShowDeleteLessonModal(true) }
                                showDeleteModal={ showDeleteLessonModal }
                            />
                        </Header>
                    ),
                    title: addOrEditLessonTitleNavigation
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
                    title: translate('navigation.titles.lessons')
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
                                deleteModalText={ deleteLessonModalTitle }
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
                    title: lessonDetailTitleNavigation
                }}
            />
        </Stack>
    );
}