import { useEffect, useState } from 'react';
import { Href, Redirect, Stack, useRouter } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

/* Constants */
import { precursors } from '@application/constants/utils';

/* Components */
import { Header, HeaderButtons } from '@ui/components';

/* Hooks */
import { useAuth } from '@auth/hooks';
import { useCourses } from '@courses/hooks';
import { useLessons } from '@lessons/hooks';
import { useRevisits } from '@revisits/hooks';
import { useNetwork, useStatus } from '@shared/hooks';
import { useTranslation } from '@ui/hooks';

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
    const { translate } = useTranslation();

    const addOrEditLessonTitleNavigation = translate('navigation.titles.lesson', {
        action: (selectedLesson.id !== '')
            ? translate('forms.actions.edit')
            : translate('forms.actions.add')
    });

    const addOrEditRevisitTitleNavigation = translate('navigation.titles.revisit', {
        action: (selectedRevisit.id !== '')
            ? translate('forms.actions.edit')
            : translate('forms.actions.add')
    });

    const deleteLessonModalTitle = translate('modals.titles.deleteAsk', {
        article: 'esta',
        attribute: translate('forms.fields.lesson')
    });

    const deleteRevisitModalTitle = translate('modals.titles.deleteAsk', {
        article: 'esta',
        attribute: translate('forms.fields.revisit')
    });

    const lessonDetailModalTitle = translate('navigation.titles.classWith', {
        name: selectedCourse.personName
    });

    const revisitDetailModalTitle = translate('navigation.titles.revisitTo', {
        name: selectedRevisit.personName
    });

    /**
     * When the user clicks the delete button, show the delete modal, and when the user clicks the
     * delete button in the modal, delete the lesson.
     *
     * @return {void} This function does not return anything
     */
    const handleDeleteLesson = (onSuccess?: () => void): void => {
        deleteLesson({
            onFinish: () => setShowDeleteLessonModal(false),
            onSuccess,
        });
    }

    /**
     * When the user clicks the delete button, show the delete modal, and when the user clicks the
     * delete button in the modal, delete the revisit.
     *
     * @return {void} This function does not return anything
     */
    const handleDeleteRevisit = (onSuccess?: () => void): void => {
        deleteRevisit({
            onFinish: () => setShowDeleteRevisitModal(false),
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
                    title: translate('navigation.titles.home')
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
                                onConfirmDeleteModal={ () => handleDeleteLesson(() => handleDismissTo('/(app)/(tabs)/preaching/publisher')) }
                                onShowDeleteModal={ () => setShowDeleteLessonModal(true) }
                                showDeleteModal={ showDeleteLessonModal }
                            />
                        </Header>
                    ),
                    title: addOrEditLessonTitleNavigation
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
                                onPressEditButton={ () => handleGoTo('/(app)/(tabs)/preaching/publisher/add-or-edit-lesson') }
                            />
                        </Header>
                    ),
                    title: lessonDetailModalTitle
                }}
            />

            <Stack.Screen
                name="add-or-edit-revisit"
                options={{
                    header: ({ options }) => (
                        <Header
                            showBackButton
                            showTitle
                            style={{ justifyContent: 'space-between' }}
                            title={ options.title }
                        >
                            <HeaderButtons
                                deleteButton={ selectedRevisit.id !== '' }
                                deleteModalText={ deleteRevisitModalTitle }
                                editButton={ false }
                                isDeleteModalLoading={ isRevisitDeleting }
                                onCloseDeleteModal={ () => setShowDeleteRevisitModal(false) }
                                onConfirmDeleteModal={ () => handleDeleteRevisit(() => handleDismissTo('/(app)/(tabs)/preaching/publisher')) }
                                onShowDeleteModal={ () => setShowDeleteRevisitModal(true) }
                                showDeleteModal={ showDeleteRevisitModal }
                            />
                        </Header>
                    ),
                    title: addOrEditRevisitTitleNavigation
                }}
            />

            <Stack.Screen
                name="revisit-detail"
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
                                deleteModalText={ deleteRevisitModalTitle }
                                isDeleteModalLoading={ isRevisitDeleting }
                                onCloseDeleteModal={ () => setShowDeleteRevisitModal(false) }
                                onConfirmDeleteModal={ () =>handleDeleteRevisit(handleGoBack) }
                                onShowDeleteModal={ () => setShowDeleteRevisitModal(true) }
                                showDeleteModal={ showDeleteRevisitModal }

                                editButton={ true }
                                onPressEditButton={ () => handleGoTo('/(app)/(tabs)/preaching/publisher/add-or-edit-revisit') }
                            />
                        </Header>
                    ),
                    title: revisitDetailModalTitle
                }}
            />
        </Stack>
    );
}