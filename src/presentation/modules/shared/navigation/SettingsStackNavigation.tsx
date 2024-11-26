import React from 'react';
import { useStyles } from 'react-native-unistyles';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

/* Modules */
import { Profile, Credentials } from '@auth';
import { ExportDataScreen, FeedbackScreen, ReportErrorScreen, Settings } from '../screens';
import { BackButton } from '@ui';

const Stack = createStackNavigator();

/**
 * This is a stack navigation for settings
 *
 * @return {JSX.Element} rendered component to show stack navigation
 */
const SettingsStackNavigation = (): JSX.Element => {
    const { theme: { colors, margins } } = useStyles();

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
                headerShadowVisible: false,
                headerTintColor: colors.headerText,
                headerTitleStyle: { marginLeft: -margins.xs },
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

            <Stack.Screen
                component={ ExportDataScreen }
                name="ExportDataScreen"
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    title: 'Exportar Información'
                }}
            />

            <Stack.Screen
                component={ FeedbackScreen }
                name="FeedbackScreen"
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    title: 'Sugerencias'
                }}
            />

            <Stack.Screen
                component={ ReportErrorScreen }
                name="ReportErrorScreen"
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    title: 'Reportar Error'
                }}
            />
        </Stack.Navigator>
    );
}

export default SettingsStackNavigation;