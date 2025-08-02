import { useEffect } from 'react';
import { Redirect, Stack } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

/* Config */
import { notificationsService } from '@config/di';

/* Hooks */
import { useAuth } from '@auth/hooks';
import { usePermissions } from '@shared/hooks';
import { useTheme } from '@theme/hooks';

export default function AppLayout(): JSX.Element {
    const { theme: { colors } } = useStyles();

    const { state: { isAuthenticated, user } } = useAuth();
    const { state: { isPermissionsRequested }, checkPermissions, isNotificationsGranted, requestPermissions } = usePermissions();
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
        if (!user.id || !isNotificationsGranted) return;
        notificationsService.listenNotificationsByUser(user.id);
    }, [ user.id, isNotificationsGranted ]);

    if (!isAuthenticated) return (<Redirect href="/auth/login" />);

    return (
        <Stack
            screenOptions={{
                contentStyle: { backgroundColor: colors.background },
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