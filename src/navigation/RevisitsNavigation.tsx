import React, { useEffect } from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { AddOrEditRevisit, Revisits } from '../screens/revisits';

import { BackButton } from '../components/ui';

import { useRevisits, useTheme } from '../hooks';

const Stack = createStackNavigator();

const RevisitsNavigation = () => {
    const { state: { seletedRevisit }, loadRevisits } = useRevisits();
    const { state: { colors } } = useTheme();

    useEffect(() => {
        loadRevisits();
    }, []);

    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                cardStyle: {
                    backgroundColor: colors.contentHeader,
                },
                headerStyle: {
                    backgroundColor: colors.header
                },
                headerTintColor: colors.headerText,
                headerShadowVisible: false
            }}
        >
            <Stack.Screen
                component={ Revisits }
                name="RevisitsScreen"
                options={{ title: 'Revisitas' }}
            />

            <Stack.Screen
                component={ AddOrEditRevisit }
                name="AddOrEditRevisitScreen"
                options={{
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    title: `${ seletedRevisit.id !== '' ? 'Editar' : 'Agregar' } revisita`
                }}
            />
        </Stack.Navigator>
    );
}

export default RevisitsNavigation;