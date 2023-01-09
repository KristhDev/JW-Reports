import React, { useEffect } from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { AddOrEditPreaching, Home } from '../screens/preaching';

import { PreachingHeader } from '../components/preaching';
import { BackButton, HomeHeader } from '../components/ui';

import { usePreaching, useTheme } from '../hooks';

import { PreachingStackParamsList } from '../interfaces/preaching';

const Stack = createStackNavigator<PreachingStackParamsList>();

const PreachingStackNavigation = () => {
    const { state: { seletedPreaching, selectedDate }, setSelectedDate, loadPreachings } = usePreaching();
    const { state: { colors } } = useTheme();

    useEffect(() => {
        setSelectedDate(new Date());
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
                    headerRight: HomeHeader,
                    title: 'Inicio'
                }}
            />

            <Stack.Screen
                component={ AddOrEditPreaching }
                name="AddOrEditPreachingScreen"
                options={{
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    headerRight: () => (
                        <PreachingHeader
                            deleteButton={ seletedPreaching.id !== '' }
                        />
                    ),
                    title: `${ seletedPreaching.id !== '' ? 'Editar' : 'Agregar' } predicación`
                }}
            />
        </Stack.Navigator>
    );
}

export default PreachingStackNavigation;