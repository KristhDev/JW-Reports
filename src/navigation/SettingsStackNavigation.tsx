import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

/* Screens */
import { Profile, Credentials } from '../screens/auth';
import { Settings } from '../screens/ui';

/* Components */
import { BackButton } from '../components/ui';

/* Hooks */
import { useTheme } from '../hooks';

const Stack = createStackNavigator();

/**
 * This is a stack navigation for settings
 */
const SettingsStackNavigation = () => {
    const { state: { colors } } = useTheme();

    return (
        <Stack.Navigator
            screenOptions={{
                headerLeft: ({ onPress }) => <BackButton color={ colors.icon } onPress={ onPress } />,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                cardStyle: {
                    backgroundColor: colors.background,
                },
                headerStyle: {
                    backgroundColor: colors.header
                },
                headerTintColor: colors.headerText,
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen
                component={ Settings }
                name="SettingsScreen"
                options={{
                    title: 'JW Reports'
                }}
            />

            <Stack.Screen
                component={ Profile }
                name="ProfileScreen"
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    title: 'Perfil'
                }}
            />

            <Stack.Screen
                component={ Credentials }
                name="CredentialsScreen"
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    title: 'Credenciales'
                }}
            />
        </Stack.Navigator>
    );
}

export default SettingsStackNavigation;