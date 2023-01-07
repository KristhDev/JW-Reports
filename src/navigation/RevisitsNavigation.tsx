import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { AddOrEditRevisit, Revisits } from '../screens/revisits';

import { BackButton } from '../components/ui';

import { useTheme } from '../hooks';

const Stack = createStackNavigator();

const RevisitsNavigation = () => {
    const { state: { colors } } = useTheme();

    const RevisitsScreen = () => <Revisits />;
    const AddOrEditRevisitScreen = () => <AddOrEditRevisit />

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
                component={ RevisitsScreen }
                name="RevisitsScreen"
                options={{ title: 'Revisitas' }}
            />

            <Stack.Screen
                component={ AddOrEditRevisitScreen }
                name="AddOrEditRevisitScreen"
                options={{
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    title: 'Agregar revisita',
                    // title: `${ seletedRevisit.id !== '' ? 'Editar' : 'Agregar' } revisita`
                }}
            />
        </Stack.Navigator>
    );
}

export default RevisitsNavigation;