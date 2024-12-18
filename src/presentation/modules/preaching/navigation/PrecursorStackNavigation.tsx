import React, { useEffect, useState } from 'react';
import { useStyles } from 'react-native-unistyles';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

/* Screens */
import { AddOrEditPreaching, PrecursorHome } from '../screens';

/* Components */
import { BackButton, HeaderButtons } from '@ui';

/* Hooks */
import { useAuth } from '@auth';
import { useNetwork, useStatus } from '@shared';
import { usePreaching } from '../hooks';

/* Interfaces */
import { PrecursorStackParamsList } from '../interfaces';

const Stack = createStackNavigator<PrecursorStackParamsList>();

/**
 * This is a stack navigation for preaching.
 *
 * @return {JSX.Element} rendered component to show stack navigation of preaching
 */
const PrecursorStackNavigation = (): JSX.Element => {
    const [ showDeletePreachingModal, setShowDeletePreachingModal ] = useState<boolean>(false);

    const { state: { user } } = useAuth();

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

    const { theme: { colors } } = useStyles();
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

    /**
     * Effect to select default date and load courses.
     */
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

        if (user.id === '') return;
        loadPreachings(selectedDate);
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
                component={ PrecursorHome }
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
        </Stack.Navigator>
    );
}

export default PrecursorStackNavigation;