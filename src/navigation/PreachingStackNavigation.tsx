import React, { useEffect, useState } from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { AddOrEditPreaching, Home } from '../screens/preaching';

import { BackButton, HeaderButtons } from '../components/ui';

import { useCourses, usePreaching, useTheme } from '../hooks';

import { PreachingStackParamsList } from '../interfaces/preaching';

const Stack = createStackNavigator<PreachingStackParamsList>();

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

    const handleDeleteConfirm = () => {
        deletePreaching(() => setShowDeleteModal(false));
    }

    useEffect(() => {
        setSelectedDate(new Date());
        loadCourses({ filter: 'all' });
    }, []);

    useEffect(() => {
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