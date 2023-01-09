import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import RevisitsTopTabsNavigation from './RevisitsTopTabsNavigation';

import { AddOrEditRevisit } from '../../screens/revisits';

import { BackButton } from '../../components/ui';

import { useRevisits, useTheme } from '../../hooks';

import { RevisitsStackParamsList } from '../../interfaces/revisits';

const Stack = createStackNavigator<RevisitsStackParamsList>();

const RevisitsStackNavigation = () => {
    const { state: { seletedRevisit } } = useRevisits();
    const { state: { colors } } = useTheme();

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
                component={ RevisitsTopTabsNavigation }
                name="RevisitsTopTabsNavigation"
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

export default RevisitsStackNavigation;