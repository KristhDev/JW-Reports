import { useEffect } from 'react';
import { Redirect, Stack } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

/* Services */
import { NotificationsService } from '@services';

/* Modules */
import { useAuth } from '@auth';
import { permissionsStatus, usePermissions } from '@shared';
import { useTheme } from '@theme';

export default function AppLayout(): JSX.Element {
    const { theme: { colors } } = useStyles();

    const { state: { isAuthenticated, user } } = useAuth();
    const { state: { isPermissionsRequested, permissions }, checkPermissions, requestPermissions } = usePermissions();
    const { state: { theme } } = useTheme();

    /**
     * Effect to check or request permissions.
     */
    useEffect(() => {
        if (isPermissionsRequested) checkPermissions();
        else requestPermissions({ notifications: true });
    }, []);

    /**
     * Effect to listen notifications by user.
     */
    useEffect(() => {
        if (!user.id || permissions.notifications !== permissionsStatus.GRANTED) return;
        NotificationsService.listenNotificationsByUser(user.id);
    }, [ user.id ]);

    if (!isAuthenticated) return (<Redirect href="/auth/login" />);

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                statusBarAnimation: 'fade',
                statusBarBackgroundColor: colors.header,
                statusBarStyle: (theme === 'dark') ? 'light' : 'dark',
            }}
        >
            <Stack.Screen name="(tabs)" />

            <Stack.Screen
                name="settings"
                options={{ animation: 'fade_from_bottom' }}
            />
        </Stack>
    );
}