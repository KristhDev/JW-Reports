import { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

import { useRevisits } from '@revisits';
import { Header, HeaderButtons } from '@ui';

import { Characters } from '@utils';

export default function RevisitsLayout(): JSX.Element {
    const [ showDeleteModal, setShowDeleteModal ] = useState<boolean>(false);

    const router = useRouter();
    const { theme: { colors } } = useStyles();

    const { state: { isRevisitDeleting, selectedRevisit }, deleteRevisit } = useRevisits();

    const revisitDetailTitle = `Revisita ${ selectedRevisit.personName }`;

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
                options={{ title: 'Revisitas' }}
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
                                deleteModalText="¿Está seguro de eliminar esta revisita?"
                                isDeleteModalLoading={ isRevisitDeleting }
                                onCloseDeleteModal={ () => setShowDeleteModal(false) }
                                onConfirmDeleteModal={ () => handleDeleteConfirm(router.back) }
                                onShowDeleteModal={ () => setShowDeleteModal(true) }
                                showDeleteModal={ showDeleteModal }

                                editButton={ true }
                                onPressEditButton={ () => router.navigate('/(app)/(tabs)/revisits/add-or-edit') }
                            />
                        </Header>
                    ),
                    title: Characters.truncate(revisitDetailTitle, 22)
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
                                deleteModalText="¿Está seguro de eliminar esta revisita?"
                                isDeleteModalLoading={ isRevisitDeleting }
                                onCloseDeleteModal={ () => setShowDeleteModal(false) }
                                onConfirmDeleteModal={ () => handleDeleteConfirm(() => router.dismissTo('/(app)/(tabs)/revisits/(tabs)')) }
                                onShowDeleteModal={ () => setShowDeleteModal(true) }
                                showDeleteModal={ showDeleteModal }
    
                                editButton={ false }
                            />
                        </Header>
                    ),
                    title: `${ selectedRevisit.id !== '' ? 'Editar' : 'Agregar' } revisita`
                }}
            />
        </Stack>
    );
}