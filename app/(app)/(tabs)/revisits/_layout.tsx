import { useState } from 'react';
import { Href, Stack, useRouter } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { Header, HeaderButtons } from '@ui/components';

/* Hooks */
import { useRevisits } from '@revisits/hooks';
import { useTranslation } from '@ui/hooks';

export default function RevisitsLayout(): JSX.Element {
    const [ showDeleteModal, setShowDeleteModal ] = useState<boolean>(false);

    const router = useRouter();
    const { theme: { colors } } = useStyles();

    const { state: { isRevisitDeleting, selectedRevisit }, deleteRevisit } = useRevisits();
    const { translate } = useTranslation();

    const addOrEditRevisitTitleNavigation = translate('navigation.titles.revisit', {
        action: (selectedRevisit.id !== '')
            ? translate('forms.actions.edit')
            : translate('forms.actions.add')
    });

    const revisitDetailTitle = translate('navigation.titles.revisitTo', { name: selectedRevisit.personName });

    const deleteRevisitModalTitle = translate('modals.titles.deleteAsk', {
        article: 'esta',
        attribute: translate('forms.fields.revisit')
    });

    /**
     * If the user confirms the delete, then delete the revisit and close the modal.
     *
     * @return {void} This function does not return anything
     */
    const handleDeleteConfirm = (onSuccess?: () => void): void => {
        deleteRevisit({
            onFinish: () => setShowDeleteModal(false),
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
                options={{ title: translate('navigation.titles.revisits') }}
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
                                deleteModalText={ deleteRevisitModalTitle }
                                isDeleteModalLoading={ isRevisitDeleting }
                                onCloseDeleteModal={ () => setShowDeleteModal(false) }
                                onConfirmDeleteModal={ () => handleDeleteConfirm(handleGoBack) }
                                onShowDeleteModal={ () => setShowDeleteModal(true) }
                                showDeleteModal={ showDeleteModal }

                                editButton={ true }
                                onPressEditButton={ () => handleGoTo('/(app)/(tabs)/revisits/add-or-edit') }
                            />
                        </Header>
                    ),
                    title: revisitDetailTitle
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
                                deleteButton={ selectedRevisit.id !== '' }
                                deleteModalText={ deleteRevisitModalTitle }
                                isDeleteModalLoading={ isRevisitDeleting }
                                onCloseDeleteModal={ () => setShowDeleteModal(false) }
                                onConfirmDeleteModal={ () => handleDeleteConfirm(() => handleDismissTo('/(app)/(tabs)/revisits/(tabs)')) }
                                onShowDeleteModal={ () => setShowDeleteModal(true) }
                                showDeleteModal={ showDeleteModal }

                                editButton={ false }
                            />
                        </Header>
                    ),
                    title: addOrEditRevisitTitleNavigation
                }}
            />
        </Stack>
    );
}