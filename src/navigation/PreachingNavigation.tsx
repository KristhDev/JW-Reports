import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { AddOrEditPreaching, Home } from '../screens/preaching';

import { BackButton, HomeHeader } from '../components/ui';

import { usePreaching, useTheme } from '../hooks';

const Stack = createStackNavigator();

const PreachingNavigation = () => {
    const { state: { seletedPreaching } } = usePreaching();
    const { state: { colors } } = useTheme();

    const AddOrEditPreachingScreen = () => <AddOrEditPreaching />;
    const HomeScreen = () => <Home />;

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
                component={ HomeScreen }
                name="HomeScreen"
                options={{
                    headerRight: HomeHeader,
                    title: 'Inicio'
                }}
            />

            <Stack.Screen
                component={ AddOrEditPreachingScreen }
                name="AddOrEditPreachingScreen"
                options={{
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    title: `${ seletedPreaching.id !== '' ? 'Editar' : 'Agregar' } predicación`
                }}
            />
        </Stack.Navigator>
    );
}

export default PreachingNavigation;