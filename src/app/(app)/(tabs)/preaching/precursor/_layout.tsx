import { useEffect, useState } from 'react';
import { Redirect, Stack } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

/* Modules */
import { useAuth } from '@auth';
import { usePreaching } from '@preaching';
import { Header, HeaderButtons } from '@ui';
import { useNetwork, useStatus } from '@shared';

export default function PrecursorLayout(): JSX.Element {
    const [ showDeletePreachingModal, setShowDeletePreachingModal ] = useState<boolean>(false);

    const { theme: { colors } } = useStyles();

    const { state: { user } } = useAuth();
    const { state: { isPreachingDeleting, selectedDate, seletedPreaching }, deletePreaching, loadPreachings, setSelectedDate } = usePreaching();
    const { setNetworkError } = useStatus();
    const { wifi } = useNetwork();

    /**
     * If the user clicks the delete button, then show the delete modal, and if the user clicks the
     * confirm button, then delete the preaching.
     *
     * @return {void} This function does not return anything
     */
    const handleDeleteConfirm = (): void => {
        deletePreaching(() => setShowDeletePreachingModal(false));
    }

    useEffect(() => {
        setSelectedDate(new Date());
    }, []);

    /**
     * Effect to load preachings of the selected date.
     */
    useEffect(() => {
        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }

        loadPreachings(selectedDate);
    } ,[ selectedDate ]);

    if (user.precursor === 'ninguno') return (<Redirect href="/(app)/(tabs)/preaching/publisher" />);

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
                                deleteButton={ seletedPreaching.id !== '' }
                                deleteModalText="¿Está seguro de eliminar este día de predicación?"
                                isDeleteModalLoading={ isPreachingDeleting }
                                onCloseDeleteModal={ () => setShowDeletePreachingModal(false) }
                                onConfirmDeleteModal={ handleDeleteConfirm }
                                onShowDeleteModal={ () => setShowDeletePreachingModal(true) }
                                showDeleteModal={ showDeletePreachingModal }
                            />
                        </Header>
                    ),
                    title: `${ seletedPreaching.id !== '' ? 'Editar' : 'Agregar' } predicación`
                }}
            />
        </Stack>
    );
}