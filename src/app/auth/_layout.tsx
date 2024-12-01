import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

/* Modules */
import { useAuth } from '@auth';
import { useTheme } from '@theme';

export default function AuthLayout(): JSX.Element {
    const router = useRouter();
    const { theme: { colors } } = useStyles();

    const { state: { isAuthenticated } } = useAuth();
    const { state: { theme } } = useTheme();

    if (isAuthenticated) router.navigate('/(app)/(tabs)/preaching');

    return (
        <Stack
            screenOptions={{
                animation: 'slide_from_right',
                contentStyle: { backgroundColor: colors.contentHeader },
                headerShown: false,
                statusBarAnimation: 'fade',
                statusBarBackgroundColor: colors.contentHeader,
                statusBarStyle: (theme === 'dark') ? 'light' : 'dark',
            }}
        >
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
            <Stack.Screen name="forgot-password" />
        </Stack>
    );
}