import React, { useEffect, useState } from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

/* Screens */
import { AddOrEditPreaching, Home } from '../screens/preaching';

/* Components */
import { BackButton, HeaderButtons } from '../components/ui';

/* Hooks */
import { useCourses, useNetwork, usePreaching, useStatus, useTheme } from '../hooks';

/* Interfaces */
import { PreachingStackParamsList } from '../interfaces/preaching';

const Stack = createStackNavigator<PreachingStackParamsList>();

/**
 * This is a stack navigation for preaching.
 */
const PreachingStackNavigation = () => {
    const [ showDeleteModal, setShowDeleteModal ] = useState<boolean>(false);

    const { loadCourses } = useCourses();
    const { state: {
        isPreachingDeleting,
        seletedPreaching,
        selectedDate },
        deletePreaching,
        setSelectedDate,
        loadPreachings
    } = usePreaching();
    const { state: { colors } } = useTheme();
    const { setNetworkError } = useStatus();
    const { isConnected } = useNetwork();

    /**
     * If the user clicks the delete button, then show the delete modal, and if the user clicks the
     * confirm button, then delete the preaching.
     */
    const handleDeleteConfirm = () => {
        deletePreaching(() => setShowDeleteModal(false));
    }

    /**
     * Effect to select default date and load courses.
     */
    useEffect(() => {
        setSelectedDate(new Date());
        if (isConnected) loadCourses({ filter: 'all' });
    }, []);

    /**
     * Effect to load preachings of the selected date.
     */
    useEffect(() => {
        if (isConnected) loadPreachings(selectedDate);
        else setNetworkError();
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
                component={ Home }
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
                            onCloseDeleteModal={ () => setShowDeleteModal(false) }
                            onConfirmDeleteModal={ handleDeleteConfirm }
                            onShowDeleteModal={ () => setShowDeleteModal(true) }
                            showDeleteModal={ showDeleteModal }
                        />
                    ),
                    title: `${ seletedPreaching.id !== '' ? 'Editar' : 'Agregar' } predicación`
                }}
            />
        </Stack.Navigator>
    );
}

export default PreachingStackNavigation;