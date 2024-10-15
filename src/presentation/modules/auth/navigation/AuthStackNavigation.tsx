import React, { useEffect } from 'react';
import { useStyles } from 'react-native-unistyles';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/* Screens */
import { ForgotPassword, Login, Register } from '../screens';

/* Hooks */
import { useAuth } from '../hooks';

/* Interfaces */
import { AuthStackParamsList } from '../interfaces';

const Stack = createStackNavigator<AuthStackParamsList>();

/**
 * This is a stack navigation for authentication.
 *
 * @return {JSX.Element} rendered component to show stack navigation of authentication
 */
const AuthStackNavigation = (): JSX.Element => {
    const { top } = useSafeAreaInsets();

    const { clearAuth } = useAuth();
    const { theme: { colors } } = useStyles();

    /**
     * Effect to clean authentication when mount navigation
     */
    useEffect(() => {
        clearAuth();
    }, []);

    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                cardStyle: {
                    backgroundColor: colors.contentHeader,
                    paddingTop: top
                },
                headerShown: false
            }}
        >
            <Stack.Screen
                name="LoginScreen"
                component={ Login }
            />

            <Stack.Screen
                name="RegisterScreen"
                component={ Register }
            />

            <Stack.Screen
                name="ForgotPasswordScreen"
                component={ ForgotPassword }
            />
        </Stack.Navigator>
    );
}

export default AuthStackNavigation;